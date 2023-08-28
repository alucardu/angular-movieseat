import { Component, NgZone, OnInit } from '@angular/core';
import { DeviceService } from './services/device.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(
    private deviceService: DeviceService,
    private router: Router,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.deviceService.detectDevice();
    this.initializeApp();
  }

  public ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute)
        rt.data.subscribe(data => {
          this.titleService.setTitle(data['title'])})
      })
  }

  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  private initializeApp():void {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            const slug = event.url.split(".at").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
        });
    });
  }
}
