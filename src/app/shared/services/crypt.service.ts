import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {
  constructor() { }

  encrypt(value: string): string {
    const secretKey = `hendrix123_s_h_k`;
    return CryptoJS.AES.encrypt(value, secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    const secretKey = `hendrix123_s_h_k`;
    return CryptoJS.AES.decrypt(textToDecrypt, secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
