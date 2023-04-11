import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, OutletContext } from '@angular/router';
import { slideInAnimation } from './animations';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  private showRouteAnimation = false;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private contexts: ChildrenOutletContexts
  ) {}

  public ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        this.showRouteAnimation = state.matches;
      });
  }

  public getRouteAnimationData(): OutletContext | null {
    if (this.showRouteAnimation) {
      return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
        'animation'
      ];
    } else {
      return null;
    }
  }
}
