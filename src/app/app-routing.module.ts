import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

const routes: Routes = [

  {
    path: 'stories/:type',
    component: StoryListComponent,
    data: { animation: 'stories' }
  },
  {
    path: 'stories',
    redirectTo: 'stories/top'
  },
  {
    path: 'story/:id',
    component: StoryDetailComponent,
    data: { animation: 'story' }
  },
  {
    path: '',
    redirectTo: '/stories/top',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: StoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
