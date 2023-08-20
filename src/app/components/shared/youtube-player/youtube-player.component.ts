import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { StatusBar } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { take } from 'rxjs';
import { fadeAnimation } from 'src/app/animations';
import { PluginListenerHandle } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { MaterialModule } from 'src/app/material.module';
@Component({
  standalone: true,
  selector: 'app-youtube-player',
  imports: [CommonModule, YouTubePlayerModule, MaterialModule],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  animations: [fadeAnimation]
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute)
  private scrollService = inject(ScrollService)

  @ViewChild('youtubePlayer') private youtubePlayer!: ElementRef<HTMLElement>;
  @ViewChild('player', { static: false }) private set playerInitial(player: YouTubePlayer) {
    if (player && !this.player) {
      this.player = player
      this.player.playVideo();

      player.ready.pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.loading = false}
      })
    }
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe({
      next: (data) => this.clipId = data.get('id')
    })
  }

  private player?: YouTubePlayer
  private backButtonListener?: PluginListenerHandle

  public playerIsPlaying = false;
  public playerWidth = 1;
  public playerHeight = 1;
  public loading = false;
  public thumbnailUrl?: string;
  public showPlayer = false;
  public playerIsLoaded = true;
  public clipId!: string | null

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

  private setPlayerDimensions(): void {
    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * (this.playerIsPlaying ? 0.9 : 1);
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.48;
  }

  public ngAfterViewInit(): void {
    // wait for route animation to end
    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * (this.playerIsPlaying ? 0.9 : 1);
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.48;

    this.scrollService.hideBottomMenu();

    StatusBar.hide().catch(() => {
      // error
    });

    window.screen.orientation.lock('landscape-primary').catch(() => {
      // error
    });

    this.initializeBackButtonListener();


    this.startVideo();
  }

  private async initializeBackButtonListener(): Promise<void> {
    this.backButtonListener = await CapacitorApp.addListener('backButton', () => {
      this.playerIsLoaded = true;
      window.screen.orientation.lock('portrait-primary').catch(() => {
        // error
      })
      StatusBar.show().catch(() => {
        // error
      })

      this.playerIsPlaying = false;
      this.player?.pauseVideo();
      this.backButtonListener?.remove();
    });
  }

  public startVideo(): void {
    this.showPlayer = true;
    this.player?.playVideo();

    if (!this.player) {
      this.loading = true;
    }
  }

  public async playerStateChanged(event: YT.OnStateChangeEvent): Promise<void> {
    const isPaused = event.data === YT.PlayerState.PAUSED;
    const isBuffering = event.data === YT.PlayerState.BUFFERING;

    if (isPaused || isBuffering) {
      return;
    }

    this.playerIsPlaying = event.data === YT.PlayerState.PLAYING;

    if (this.playerIsPlaying) {
      setTimeout(() => {
        this.playerIsLoaded = false;
      }, 24)

    }
  }

  public ngOnDestroy(): void {
    this.backButtonListener?.remove();
  }
}
