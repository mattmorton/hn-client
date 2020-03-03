import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { mergeMap, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  ids$: Observable<number[]>;
  stories$: Observable<any>;
  data$: Observable<any>;
  page$ = new Subject<number>();
  
  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIds();
  }

  onClickStory($event: any, id: any) {
    this.router.navigate([`/story/${id}`])
  }

  pageChange($event: any) {
    this.page$.next($event);
  }


  getIdsAndFirstTenTopStories() {
    this.data$ = this.api.getTopStories().pipe(
      mergeMap((ids) => {
        const topTenIds = ids.slice(0, 10)
        return this.api.getMultipleItems(topTenIds).pipe(map(stories => {
          return { ids: ids, stories: stories }
        }))
      }),
    )
  }

  getIds() {
    this.ids$ = this.api.getTopStories();
  }

}
