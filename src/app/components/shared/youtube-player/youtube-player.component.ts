import { Component } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  standalone: true,
  selector: 'app-youtube-player',
  imports: [YouTubePlayerModule],
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent {
  public playerStateChanged(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.PLAYING) {
      console.log('playing');
    }
  }
}
