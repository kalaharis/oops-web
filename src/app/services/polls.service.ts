import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Poll } from 'app/models/poll';
import { PollsPage } from 'app/models/polls-page';

@Injectable()
export class PollsService {
  private baseUrl = 'http://192.168.0.21:8080/api/polls';
  //  private baseUrl = 'http://localhost:8080/api/polls';

  constructor(private client: HttpClient,
    private http: Http) { }

  public getPolls(params: Map<string, any>): Observable<HttpResponse<PollsPage>> {
    console.log('getting all polls');
    let url = this.baseUrl;
    let httpParams = new HttpParams();
    params.forEach((value: any, key: string) => { httpParams = httpParams.set(key, value) })

    return this.client.get<PollsPage>(url, {
      observe: 'response',
      params: httpParams
    });
  }

  public vote(id: string, selected: number[]): Observable<HttpResponse<Poll>> {
    console.log(`voting for: ${id}`);
    console.log('selected:')
    console.log(selected.toString())

    let url = `${this.baseUrl}/${id}`;
    return this.client.put<Poll>(url, null, {
      observe: 'response',
      params: new HttpParams().set('vote', selected.toString())
    });
  }

  public getPollById(id: string): Observable<HttpResponse<Poll>> {
    console.log(`getting poll by id: ${id}`);

    let url = `${this.baseUrl}/${id}`;
    return this.client.get<Poll>(url, {
      observe: 'response'
    });

    /*const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Poll)
      .catch(this.handleError)*/
  }

  public startPoll(pollProperties: any): Observable<HttpResponse<Poll>> {
    console.log(`starting poll`);
    console.log(`poll properties:`);
    console.log(pollProperties);

    const url = `${this.baseUrl}/`;
    return this.client.post<Poll>(url, pollProperties, {
      observe: 'response'
    });

    /*return this.http.post(url, pollProperties)
      .toPromise()
      .then(response => response.json() as Poll)
      .catch(this.handleError)*/
  }

}
