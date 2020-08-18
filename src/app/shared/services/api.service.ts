import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import {DataStorageService} from './data-storage.service';
import {BaseEntity, ParamApiEntity} from '../entities';


export class ApiService<T extends BaseEntity> extends DataStorageService {
  api: string;
  url: string;
  http: HttpClient;
  header: HttpHeaders;
  listParams: ParamApiEntity[];
  constructor(path: string, http: HttpClient) {
    super();
    this.api = `${environment.url}`;
    this.url = `${this.api}/${path}`;
    this.http = http;
    this.header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.listParams = [];
  }
  protected getParamsAsString(): string {
    if (this.listParams.length) {
      return `?${this.listParams
        .filter(param => !!param.getValue().toString() && param.getValue() !== '')
        .map(param => `${param.getName()}=${param.getValue()}`).join('&')}`;
    }
    return '';
  }
  protected getParamsAsList(): Array<ParamApiEntity> {
    return this.listParams;
  }
  setParam(name, value): void {
    if (value === undefined || value === null) {
      value = '';
    }
    if (Array.isArray(value)) {
      _.remove(this.listParams, f => f.getName() === name);
      _.forEach(value, v => this.listParams.push(new ParamApiEntity(name, v)));
    } else {
      const param = _.find(this.listParams, f => f.getName() === name);
      if (param) {
        param.setValue(value);
      } else {
        this.listParams.push(new ParamApiEntity(name, value));
      }
    }
  }
  clearParams(): void {
    this.listParams = [];
  }
  clearParamsByKey(key): void {
    _.forEach(this.listParams, (it) => {
      if (it.getName() === key) {
        it.setValue('');
      }
    });
  }
  findAll(): Promise<T[]> {
    return this.http
      .get(`${this.url}${this.getParamsAsString()}`)
      .pipe(
        map(response => {
          return response as T[];
        }),
        catchError(this.handleError)
      ).toPromise();
  }
  findById(id: string): Promise<T> {
    return this.http
      .get(`${this.url}/${id}/`)
      .pipe(
        map(response => {
          return response as T;
        }),
        catchError(this.handleError)
      ).toPromise();
  }
  save(resource: T): Promise<T> {
    const id = resource.id;
    if (id && id >= 0) {
      return this.http.put(`${this.url}/${id}/`, JSON.stringify(resource), { headers: this.header })
        .pipe(
          map(response => response as T),
          catchError(this.handleError)
        ).toPromise();
    }
    return this.http.post(`${this.url}/`, resource, { headers: this.header })
      .pipe(
        map(response => response as T),
        catchError(this.handleError)
      ).toPromise();
  }

  remove(id: number): Promise<any> {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(
        map(response => {}),
        catchError(this.handleError)
      ).toPromise();
  }
  handleError(error: any): Promise<any> {
    console.error('An error occurred', this.url);
    return Promise.reject(error);
  }
}
