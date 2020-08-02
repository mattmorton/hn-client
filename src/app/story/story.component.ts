import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  @Input() story: any;
  public showStoryText: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.showStoryText = true;
      }
    })
  }

  onClickStory($event: any, story: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!story.url) {
      this.router.navigate([`/story/${story.id}`], { state: story })
    } else {
      window.location.href = story.url
    }
  }

  onClickComments($event: any, story: any) {
    this.router.navigate([`/story/${story.id}`], { state: story })

  }

}
