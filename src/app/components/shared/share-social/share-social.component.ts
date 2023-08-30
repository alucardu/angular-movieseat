import { Component, Input } from '@angular/core';
import { Share } from '@capacitor/share';
import { MaterialModule } from 'src/app/material.module';


@Component({
  standalone: true,
  imports: [MaterialModule],
  selector: 'app-share-social',
  templateUrl: './share-social.component.html',
  styleUrls: ['./share-social.component.scss']

})
export class ShareSocialComponent {
  @Input() public shareMessage!: string;
  @Input() public id!: string

  public async shareInfo(e: Event): Promise<void> {
    e.preventDefault();
    // is used in mobile app share button, not in the browser share api
    await Share.share({
      text: this.shareMessage,
      url: `https://www.moviese.at/movie/${this.id}`,
    });
  }
}
