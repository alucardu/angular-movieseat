import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeToggle } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-movie-search-suggestion',
  templateUrl: './movie-search-suggestion.component.html',
  styleUrls: ['./movie-search-suggestion.component.scss'],
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  animations: [fadeToggle]
})
export class MovieSearchSuggestionComponent {
  @Input() public type!: string;

  @ViewChild('comingSoon') private comingSoon!: ElementRef<HTMLElement>
  @ViewChild('playingNow') private playingNow!: ElementRef<HTMLElement>

  public selectedType = 'comingSoon';
  public colorType = 'comingSoon';

  public toggleSelection(type: string): void {
    if (this.selectedType === type) {
      this.selectedType = this.selectedType === 'comingSoon' ? 'playingNow' : 'comingSoon'
      this.colorType = this.colorType === 'comingSoon' ? 'playingNow' : 'comingSoon'
      return;
    }

    this.selectedType = type;
    this.colorType = type;
  }

  public resetScrollPosition(): void {
    this.comingSoon.nativeElement.scrollLeft = 0
    this.playingNow.nativeElement.scrollLeft = 0
  }

  public returnSelectedState(type: string): string {
    return this.selectedType === type ? 'in' : 'out'
  }
}
