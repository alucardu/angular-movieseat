import { Component, NgZone, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { DeviceService } from './services/device.service';
import { AuthService } from './components/authentication/auth.service';
import { SnackBarState, SnackbBarService } from './services/snackbBar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  private deviceService = inject(DeviceService)
  private router = inject(Router)
  private zone = inject(NgZone)
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)
  private authService = inject(AuthService)
  private snackBarService = inject(SnackbBarService)

  public ngOnInit(): void {
    this.checkAuthToken();
    this.deviceService.detectDevice();
    this.initializeApp();

    this.metaTitleService.setTitle('Movieseat')
    this.metaTagService.addTag({name: 'keywords', content: 'Movieseat, Watchlist, Movies'})
  }

  private checkAuthToken(): void {
    this.authService.authenticateByCookie().subscribe({
      next: ({data}) => {
        if (!data?.authenticateByCookie) return
        const { response: response, data: userData } = data.authenticateByCookie;
        this.authService.loginUser()
        this.router.navigate(['/watchlist'])
        this.snackBarService.openSnackBar(response, SnackBarState.SUCCESS, userData)
      },
      error: () => {
        // do nothing
      }
    })
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
