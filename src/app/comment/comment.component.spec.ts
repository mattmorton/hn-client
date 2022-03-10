import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommentComponent } from './comment.component';
import { ApiService } from '../api.service';
import { comment } from '../api.service.mocks';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {

    const spy = jasmine.createSpyObj('ApiService', ['getMultipleItems']);

    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      providers: [
        { provide: ApiService, useValue: spy }
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment the comment nested depth value by 1 when called', () => {
    component.depth = 0;
    const incrementedDepth = component.incrementDepth();
    expect(incrementedDepth).toEqual(1);
  })

  it('should not render anything if a comment is not provided', () => {
    const commentTextDe: DebugElement = fixture.debugElement;
    const commentTextEl: HTMLElement = commentTextDe.nativeElement;
    const comment = commentTextEl.querySelector('comment-container');
    expect(comment).toBeNull();
  })

  it('should render inner html', () => {
    component.comment = comment;
    const commentTextDe: DebugElement = fixture.debugElement;
    const commentTextEl: HTMLElement = commentTextDe.nativeElement;
    const commentText = commentTextEl.querySelector('#comment-text');
    expect(commentText).toBeDefined();
  })
});
