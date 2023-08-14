import { Component, Input, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-rating-circle',
  templateUrl: './rating-circle.component.html',
  styleUrls: ['./rating-circle.component.scss'],
  standalone: true,
  imports: [NgCircleProgressModule]
})
export class RatingCircleComponent implements OnInit {
  @Input() public rating!: number;

  public backgroundColor!: string;

  public ngOnInit(): void {
    this.backgroundColor = this.setBackgroundColor();
  }

  private setBackgroundColor(): string {
    let backgroundColor!: string;

    switch (true) {
      case this.rating < 25:
        backgroundColor = 'red';
        break;

      case this.rating < 55:
        backgroundColor = 'orange';
        break;

      case this.rating < 80:
        backgroundColor = 'yellow';
        break;

      case this.rating <= 100:
        backgroundColor = '#00e60f';
        break;
    }

    return backgroundColor;
  }
}
