import { Component, Input } from '@angular/core';
import { Share } from '@capacitor/share';
import { IMovie } from '../../features/movie-dashboard/movie-display/movie-display.component';
import { MaterialModule } from 'src/app/material.module';


@Component({
  standalone: true,
  imports: [MaterialModule],
  selector: 'app-share-social',
  templateUrl: './share-social.component.html',
  styleUrls: ['./share-social.component.scss']

})
export class ShareSocialComponent {
  @Input() public movie!: IMovie

  public async shareInfo(e: Event): Promise<void> {
    console.log(`Check out this movie!: ${this.movie.title}`)
    e.preventDefault();
    await Share.share({
      text: `Check out this movie!: ${this.movie.title}`,
      url: this.generateLink(this.movie.title),
    });
  }

  private generateLink(title: string): string {
    title = title.replaceAll(' ', '-').toLowerCase();
    return `https://www.moviese.at/movie/${title}`;
  }

}
