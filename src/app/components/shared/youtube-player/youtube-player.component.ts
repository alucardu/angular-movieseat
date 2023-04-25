import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { StatusBar } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { Subscription, delay } from 'rxjs';
import { fadeAnimation } from 'src/app/animations';

@Component({
  standalone: true,
  selector: 'app-youtube-player',
  imports: [CommonModule, YouTubePlayerModule],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  animations: [fadeAnimation]
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('youtubePlayer') private youtubePlayer!: ElementRef<HTMLElement>;
  @ViewChild('player', { static: true }) public player!: YouTubePlayer;

  @Input() public videoId!: string
  @Input() public showThumbnail = false;

  private playerSubscription$ = new Subscription

  public playerIsPlaying = false;
  public playerWidth = 1;
  public playerHeight = 1;
  public loading = true;
  public thumbnailUrl?: string;

  public constructor(private cd: ChangeDetectorRef) {}

  public async ngOnInit(): Promise<void> {
    this.thumbnailUrl = await this.returnHighestQualityImage();
  }

  public ngAfterViewInit(): void {
    CapacitorApp.addListener('backButton', () => {
      window.screen.orientation.lock('portrait').catch(() => {
        // error
      })
      StatusBar.show().catch(() => {
        // error
      })
      this.playerIsPlaying = false;
      this.player.pauseVideo();
    });

    this.playerSubscription$ = this.player.ready.pipe(
      delay(800)
    ).subscribe({
      next: () => this.loading = false
    })
  }

  public ngAfterViewChecked(): void {
    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * (this.playerIsPlaying ? 0.9 : 1);
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.48;

    this.cd.detectChanges();
  }

  public async returnHighestQualityImage(): Promise<string | undefined> {
    const maxresdefault = `https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`
    const mqdefault = `https://i.ytimg.com/vi/${this.videoId}/mqdefault.jpg`

    if ((await this.checkImageExists(maxresdefault))) {
      return maxresdefault
    }

    if ((await this.checkImageExists(mqdefault))) {
      return mqdefault
    }

    return undefined
  }

  private async checkImageExists(url: string): Promise<boolean> {
    const img = new Image();
    img.src = url;

    return new Promise<boolean>((resolve) => {
      img.onload = (): void => {
        if (img.height === 90 && img.width === 120) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
    });
  }

  public startVideo(): void {
    this.player.playVideo();
  }

  public playerStateChanged(event: YT.OnStateChangeEvent): void {
    const isPaused = event.data === YT.PlayerState.PAUSED;
    const isBuffering = event.data === YT.PlayerState.BUFFERING;

    if (isPaused || isBuffering) {
      return;
    }

    this.playerIsPlaying = event.data === YT.PlayerState.PLAYING;

    if (this.playerIsPlaying) {
      window.screen.orientation.lock('landscape').catch(() => {
        // error
      });
      StatusBar.hide().catch(() => {
        // error
      });
    } else {
      window.screen.orientation.lock('portrait').catch(() => {
        // error
      });
      StatusBar.show().catch(() => {
        // error
      });
    }
  }

  public ngOnDestroy(): void {
    this.playerSubscription$.unsubscribe()
  }
}
