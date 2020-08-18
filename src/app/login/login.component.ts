import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { UserService } from '../shared/services';
import { ILogin } from '../shared/interfaces';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  providers: [ UserService ],
})
export class LoginComponent implements OnInit {
  loading: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private toaster: Toaster,
  ) {
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { username, password } = this.loginForm.getRawValue();
      const user = { username, password} as ILogin;
      this.userService.login(user).then(
        res => {
          this.loading = false;
          this.userService.setProfileInStorage(res);
          this.showSuccess();
          this.router.navigate(['/dashboard']);
        }, () => {
          this.loading = false;
          this.showWrongPassword();
        });
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  private showWrongPassword(): void {
    this.toaster.open({
      text: 'Email/Senha inválido. Por favor verifique',
      caption: 'Oops!',
      type: 'danger',
      position: 'top-right'
    });
  }
  private showSuccess(): void {
    this.toaster.open({
      text: 'Login efetuado com sucesso. Bem-vindo ;)',
      caption: 'Wooow!',
      type: 'success',
      position: 'top-right'
    });
  }
}
