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
  @Input() depth: number;
  public kids$: Observable<any>;
  public borderColours = ['#D46A6A', '#D49A6A', '#407F7F', '#55AA55'];

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

  incrementDepth() {
    return this.depth + 1;
  }

  setBorderColor() {
    const selectedColor = this.borderColours[this.depth % 4];
    return `solid ${selectedColor}`;
  }

}
