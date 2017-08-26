import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { retryWhenRequestFails } from '../utils/observable-retry';

@Injectable()
export class WebApiService {
  // tslint:disable:no-any
  constructor(private http: HttpClient) { }
  public setHeaders(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  public async getService(url: string): Promise<void | HttpResponse<any>> {
    return await this.http.get(url, { headers: this.setHeaders(), observe: 'response' })
      .map((res: HttpResponse<any>) => res)
      .retryWhen(retryWhenRequestFails({ attempts: 3, delay: 500 })).share().toPromise()
      .catch(this.checkErrorFault);
  }

  public async postService(url: string, param: any): Promise<void | HttpResponse<any>> {
    const body: string = JSON.stringify(param);
    return await this.http.post(url, body, { headers: this.setHeaders(), observe: 'response' })
      .map((res: HttpResponse<any>) => res)
      .retryWhen(retryWhenRequestFails({ attempts: 3, delay: 500 })).share().toPromise()
      .catch(this.checkErrorFault);
  }

  public checkErrorFault(err: any): void {
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      Observable.throw(new Error(`An error occurred: ${err.error.message}`));
    }
    // The backend returned an unsuccessful response code.
    Observable.throw(new Error(`Backend returned code ${err.status}, body was: ${err.error}`));
  }
}
