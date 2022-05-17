import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { IResponse, IRequest, ApiError } from 'src/app/models/api';
import { SessionService } from '../session.service';
import {map, tap} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private id = 0;
  /**
   * @event ApiService#onAuthError
   */
  onAuthError: Subject<Error> = new Subject();

  constructor(private http: HttpClient, private session: SessionService) {}

  private getBody(method: string, params: any): IRequest {
    return {
      id: this.id++,
      sessionToken: this.session.get(),
      method,
      params
    };
  }

  /**
   * Проверка на ошибки в json протоколе. Если ошибка не связана с авторизацией
   * (401), то будет выброшен ивент this.onAuthError.
   * @param response dsa
   * @fires onAuthError asd
   */
  checkApiError<T>(response: IResponse<T>) {
    if (!response.error) {
      return;
    }

    let error: Error;

    switch (response.error.code) {
      case 101:
        error = ApiError['auth'];
        this.onAuthError.error(error);
        break;

      case 102:
        error = ApiError['login'];
        break;

      default:
        error = ApiError['default'];
    }

    throw new Error(error.message);
  }

  post<T>(method: string, params: any = {}): Observable<T> {
    this.id++;

    return this.http
      .post<IResponse<T>>(
        env.http.apiUrl,
        this.getBody(method, params)
      )
      .pipe(
        tap(this.checkApiError.bind(this)),
        map((response: IResponse<T>) => response.result as T),
      );
  }
}
