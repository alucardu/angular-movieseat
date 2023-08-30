import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: []
})
export class MovieDetailsComponent implements OnInit {
  private metaTagService = inject(Meta)
  private metaTitleService = inject(Title)

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Moonrise kingdom') // for sharing popup on device

    this.metaTagService.updateTag({ property: 'og:type', content: 'Movie' })
    this.metaTagService.updateTag({ property: 'og:url', content: 'https://moviese.at/movies/moonrise-kingdom' })
    this.metaTagService.updateTag({ property: 'og:image', content: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xrziXRHRQ7c7YLIehgSJY8GQBsx.jpg' })
    this.metaTagService.updateTag({ property: 'og:title', content: 'Moonrise Kingdom' })
    this.metaTagService.updateTag({ property: 'og:description', content: 'Set on an island off the coast of New England in the summer of 1965, Moonrise Kingdom tells the story of two twelve-year-olds who fall in love, make a secret pact, and run away together into the wilderness. As various authorities try to hunt them down, a violent storm is brewing off-shore – and the peaceful island community is turned upside down in more ways than anyone can handle.' })
  }
}
