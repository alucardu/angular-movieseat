import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { StatusBar } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-youtube-player',
  imports: [CommonModule, YouTubePlayerModule],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('youtubePlayer') private youtubePlayer!: ElementRef<HTMLElement>;
  @ViewChild('player', { static: true }) public player!: YouTubePlayer;

  private playerSubscription$ = new Subscription

  public playerIsPlaying = false;
  public playerWidth = 1;
  public playerHeight = 1;
  public loading = true;

  public constructor(private cd: ChangeDetectorRef) {}

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

    this.playerWidth = this.youtubePlayer.nativeElement.offsetWidth * 0.9;
    this.playerHeight = this.youtubePlayer.nativeElement.offsetWidth * 0.5;

    this.playerSubscription$ = this.player.ready.subscribe({
      next: () => this.loading = false
    })

    this.cd.detectChanges()
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
