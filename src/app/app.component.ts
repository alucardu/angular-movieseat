import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { DeviceService } from './services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private deviceService = inject(DeviceService)
  private router = inject(Router)
  private zone = inject(NgZone)
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    this.deviceService.detectDevice();
    this.initializeApp();

    this.metaTitleService.setTitle('Movieseat')
    this.metaTagService.addTag({name: 'keywords', content: 'Movieseat, Watchlist, Movies'})
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
