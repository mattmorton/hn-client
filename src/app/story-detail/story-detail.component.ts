import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, concat, combineLatest, from } from 'rxjs';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

  public story$: Observable<any>;
  public comments$: Observable<any>;
  public data$: Observable<any>;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStoryAndComments()
  }

  getStoryAndComments() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data$ = this.api.getItemById(id).pipe(
      mergeMap((story) => {
        return this.api.getMultipleItems(story.kids).pipe(map(comments => {
          console.log('comments', comments)
          return { story: story, comments: comments }
        }))
      }),
    )
  }




}
