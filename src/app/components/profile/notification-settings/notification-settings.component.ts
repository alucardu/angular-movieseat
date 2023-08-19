import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class NotificationSettingsComponent implements OnInit {
  private formBuilder = inject(FormBuilder)

  public notificationSettingsForm!: FormGroup

  public ngOnInit(): void {
    this.notificationSettingsForm = this.formBuilder.nonNullable.group({
      friendAddsMovie: [{value: 'Friend adds movie', disabled: true}],
      friendAddsMovieReview: [{value: 'Friend reviews movie', disabled: true}],
      newMovieReleaseDate: [{value: 'New movie release date', disabled: true}],
      newMovieTrailer: [{value: 'New movie trailer', disabled: true}],
    })
  }

  public toggleEdit(): void {
    this.notificationSettingsForm.disabled ? this.notificationSettingsForm.enable() : this.notificationSettingsForm.disable();
  }

  public resetForm(): void {
    this.notificationSettingsForm.reset();
    this.notificationSettingsForm.disable();
  }

  public submitForm(): void {
    if(this.notificationSettingsForm.valid) {
      this.notificationSettingsForm.disable();
    }
  }
}
