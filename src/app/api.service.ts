import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export interface Item {
  id: number;
  deleted?: boolean;
  type?: string;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
  display?: boolean;
}

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

  getStoriesByType(type: string): Observable<number[]> {
    const url = `${this.baseUrl}/${type}stories.json`;
    return this.http.get<number[]>(url).pipe(
      map((res) => res.slice(0, 50)),
      publishReplay(1),
      refCount()
    )
  }

  getItemById(id): Observable<Item> {
    const url = `${this.baseUrl}/item/${id}.json`;
    return this.http.get<Item>(url).pipe(
      tap(res => res.display = true)
    )
  }

  getMultipleItems(ids: number[]): Observable<Item[]> {
    const requests = ids.map(i => this.getItemById(i).pipe(
      catchError(error => of(error))
    ));
    return forkJoin(
      requests
    )
  }

}
