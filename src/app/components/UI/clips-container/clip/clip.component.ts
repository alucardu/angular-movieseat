import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { IClip } from 'src/app/mock/movie-clips.json';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ClipComponent implements OnInit {
  private http = inject(HttpClient)
  @Input() public clip!: IClip
  @Input() public showThumbnail = false;

  public thumbnailUrl?: string;
  public title?: string;

  public async ngOnInit(): Promise<void> {
    this.thumbnailUrl = await this.returnHighestQualityImage()

    const url = `https://www.youtube.com/watch?v=${this.clip.id}`;
    this.http.get<{title: string}>('https://noembed.com/embed', {
      params: { format: 'json', url: url
    }}).subscribe({
      next: (data) => this.title = data.title
    })
  }

  private async returnHighestQualityImage(): Promise<string | undefined> {
    const maxresdefault = `https://i.ytimg.com/vi/${this.clip.id}/maxresdefault.jpg`
    const mqdefault = `https://i.ytimg.com/vi/${this.clip.id}/mqdefault.jpg`

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
}

