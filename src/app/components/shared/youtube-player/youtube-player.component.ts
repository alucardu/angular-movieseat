import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { StatusBar } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { take } from 'rxjs';
import { fadeAnimation } from 'src/app/animations';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  standalone: true,
  selector: 'app-youtube-player',
  imports: [CommonModule, YouTubePlayerModule],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  animations: [fadeAnimation]
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('youtubePlayer') private youtubePlayer!: ElementRef<HTMLElement>;
  @ViewChild('player', { static: false }) private set playerInitial(player: YouTubePlayer) {
    if (player) {
      this.player = player

      player.ready.pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.loading = false}
      })
    }
  }
  private player?: YouTubePlayer
  private backButtonListener?: PluginListenerHandle

  @Input() public videoId!: string
  @Input() public showThumbnail = false;

  public playerIsPlaying = false;
  public playerWidth = 1;
  public playerHeight = 1;
  public loading = true;
  public thumbnailUrl?: string;
  public showPlayer = false;

  public constructor() {
    window.addEventListener("orientationchange", () => {
      let currentWidth = this.youtubePlayer.nativeElement.offsetWidth
      let nextWidth = 0;

      const widthCheck = setInterval(() => {
        nextWidth = this.youtubePlayer.nativeElement.offsetWidth
        if (nextWidth > currentWidth) {
          this.setPlayerDimensions();
          currentWidth = this.youtubePlayer.nativeElement.offsetWidth
          window.clearInterval(widthCheck)
        }

        if (nextWidth < currentWidth) {
          this.setPlayerDimensions();
          window.clearInterval(widthCheck)
        }
      }, 1)
    });
  }

  public async ngOnInit(): Promise<void> {
    if (this.showThumbnail) {
      this.thumbnailUrl = await this.returnHighestQualityImage()
    }
  }

  private setPlayerDimensions(): void {
    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * (this.playerIsPlaying ? 0.9 : 1);
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.48;
  }

  public ngAfterViewInit(): void {
    // wait for route animation to end
    setTimeout(() => {
      this.showPlayer = true;
    }, 225)
    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * (this.playerIsPlaying ? 0.9 : 1);
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.48;
  }

  private async initializeBackButtonListener(): Promise<void> {
    this.backButtonListener = await CapacitorApp.addListener('backButton', () => {
      if (this.playerIsPlaying) {
        window.screen.orientation.lock('portrait-primary').catch(() => {
          // error
        })
        StatusBar.show().catch(() => {
          // error
        })

        this.playerIsPlaying = false;
        this.player?.pauseVideo();
        this.backButtonListener?.remove();
      }
    });
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
    this.player?.playVideo();
  }

  public async playerStateChanged(event: YT.OnStateChangeEvent): Promise<void> {
    const isPaused = event.data === YT.PlayerState.PAUSED;
    const isBuffering = event.data === YT.PlayerState.BUFFERING;

    if (isPaused || isBuffering) {
      return;
    }

    this.playerIsPlaying = event.data === YT.PlayerState.PLAYING;

    if (this.playerIsPlaying) {
      await StatusBar.hide().catch(() => {
        // error
      });

      window.screen.orientation.lock('landscape-primary').catch(() => {
        // error
      });

      this.initializeBackButtonListener();

    } else {
      if (window.screen.orientation.type === 'landscape-primary') {
        window.screen.orientation.lock('portrait-primary').catch(() => {
          // error
        });
        StatusBar.show().catch(() => {
          // error
        });
      }
    }
  }

  public ngOnDestroy(): void {
    this.backButtonListener?.remove();
  }
}
