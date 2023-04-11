import { Component } from '@angular/core';
import { ChildrenOutletContexts, OutletContext } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  public title = 'angular-movieseat';

  public constructor(private contexts: ChildrenOutletContexts) {}

  public getRouteAnimationData(): OutletContext | null {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
