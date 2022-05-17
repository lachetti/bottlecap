import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  set( sessionId: string ): void {
    localStorage.setItem('sessionToken', sessionId);
  }

  get(): string {
    return localStorage.getItem('sessionToken') || '';
  }

  remove(): void {
    localStorage.removeItem('sessionToken');
  }

}
