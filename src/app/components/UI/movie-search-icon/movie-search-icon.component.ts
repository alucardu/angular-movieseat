import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-movie-search-icon',
  templateUrl: './movie-search-icon.component.html',
  styleUrls: ['./movie-search-icon.component.scss'],
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
})
export class MovieSearchIconComponent {}
