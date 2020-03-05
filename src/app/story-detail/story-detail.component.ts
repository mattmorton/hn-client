import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, concat, combineLatest, from } from 'rxjs';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { tap, mergeMap, switchMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

  public story$: Observable<any>;
  public comments$: Observable<any>;
  public data$: Observable<any>;
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getStory();
    this.getComments();
  }

  ngOnInit(): void {

  }

  getComments() {
    this.comments$ = this.story$.pipe(
      switchMap((story) => {
          return this.api.getMultipleItems(story.kids).pipe(
            tap(() => this.loading = false)
          )
      })
    )
  }

  getStory() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.story$ = from([this.router.getCurrentNavigation().extras.state])
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.story$ = this.api.getItemById(id);
    }
  }
}
