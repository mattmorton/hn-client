import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  public kids$: Observable<any>;


  constructor(
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
  }

  loadSubItems(event, comment) {
    event.preventDefault();
    event.stopPropagation();
    this.kids$ = this.api.getMultipleItems(comment.kids);
  }

  collapseComment(event, comment) {
    event.preventDefault();
    event.stopPropagation();
    comment.display = !comment.display;
  }

}
