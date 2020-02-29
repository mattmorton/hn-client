import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl = 'https://hacker-news.firebaseio.com/v0';

  private topStories$: Observable<any>;

  constructor(
    private http: HttpClient
  ) {

  }

  getTopStories(): Observable<[number]> {
    const url = `${this.baseUrl}/topstories.json`;
    return this.http.get<[number]>(url)
  }

  getItemById(id): Observable<any> {
    const url = `${this.baseUrl}/item/${id}.json`;
    return this.http.get<any>(url)
  }

  getMultipleItems(ids: number[]) {
    const requests = ids.map(i => this.getItemById(i).pipe(
      catchError(error => of(error))
    ));
    return forkJoin(
      requests
    )
  }

}
