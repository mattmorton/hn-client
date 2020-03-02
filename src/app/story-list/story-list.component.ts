import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { mergeMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  stories$: Observable<any>;
  p: number;
  data$: Observable<any>;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIdsAndFirstTenTopStories();
  }

  getTopStories() {
    this.api.getTopStories().subscribe((res) => {
      const ids = res.slice(0, 30)
      this.stories$ = this.api.getMultipleItems(ids);
    })
  }

  onClickStory($event: any, story: any) {
    this.router.navigate([`/story/${story.id}`])
  }

  pageChange($event: any) {
    this.p = $event;
  }


  getIdsAndFirstTenTopStories() {
    this.data$ = this.api.getTopStories().pipe(
      mergeMap((ids) => {
        const topTenIds = ids.slice(0, 20)
        return this.api.getMultipleItems(topTenIds).pipe(map(stories => {
          return { ids: ids, stories: stories }
        }))
      }),
    )
  }

}
