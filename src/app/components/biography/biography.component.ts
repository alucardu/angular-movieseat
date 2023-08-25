import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleDirective } from 'src/app/directives/toggle-content/toggle-content.directive';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink, ToggleDirective],
})
export class BiographyComponent {
  public biography = 'American actor, filmmaker and activist Edward Harrison Norton was born on August 18, 1969, in Boston, Massachusetts, and was raised in Columbia, Maryland. His mother, Lydia Robinson "Robin" (Rouse), was a foundation executive and teacher of English, and a daughter of famed real estate developer James Rouse, who developed Columbia, MD; she passed away of brain cancer on March 6, 1997. His father, Edward Mower Norton, was an environmental lawyer and conservationist, who works for the National Trust for Historic Preservation. Edward has two younger siblings, James and Molly.'
  public showBiography = false;
}
