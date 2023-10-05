import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMovie } from 'src/app/mock/watchlist.json';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class ImageSliderComponent {
  @Input() public movie!: IMovie
}
