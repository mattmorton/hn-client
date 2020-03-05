import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { environment } from 'src/environments/environment';
import { slideInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'hn-client';

  constructor(

  ) {
    firebase.initializeApp(environment.firebaseConfig)
    // firebase.analytics().logEvent('init')
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
