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
