import { Component, NgZone } from '@angular/core';
import { DeviceService } from './services/device.service';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(
    private deviceService: DeviceService,
    private router: Router,
    private zone: NgZone
  ) {
    this.deviceService.detectDevice();
    this.initializeApp();
  }

  private initializeApp():void {
    console.log(1)
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          console.log('test')
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            console.log(event.url)
            const slug = event.url.split(".com").pop();
            console.log(slug)
            // if (slug) {
            //     this.router.navigateByUrl(slug);
            // }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    });
}
}
