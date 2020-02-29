import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  stories$: Observable<any>

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTopStories();
  }

  getTopStories() {
    this.api.getTopStories().subscribe((res) => {
      const ids = res.slice(0, 10)
      this.stories$ = this.api.getMultipleItems(ids);
    })
  }

  onClickStory($event: any, story: any) {
    this.router.navigate([`/story/${story.id}`])
  }

}
