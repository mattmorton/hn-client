import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  @Input() id: any;
  story$: Observable<any>

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.story$ = this.api.getItemById(this.id)
  }

}
