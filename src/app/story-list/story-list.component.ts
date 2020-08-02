import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, NavigationStart } from '@angular/router';
import { mergeMap, map, tap, switchMap, share } from 'rxjs/operators';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  data$: Observable<any>;
  page$ = new Subject<number>();
  loading = true;
  
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.watchUrlChanges();
  }

  watchUrlChanges() {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.loading = true;
        return this.api.getStoriesByType(params.get('type')).pipe(
          mergeMap((ids) => {
            return this.api.getMultipleItems(ids).pipe(map(stories => {
              this.loading = false;
              return { ids: ids, stories: stories }
            }))
          })
        )
      })
    )
  }

  pageChange($event: any) {
    this.page$.next($event);
  }

}
