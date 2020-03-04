import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryComponent } from './story/story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { CommentComponent } from './comment/comment.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryComponent,
    StoryDetailComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
