import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class ProfileDisplayComponent implements OnInit {
  public profileForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.profileForm = this.formBuilder.nonNullable.group({
      firstName: [{ value: 'Peter', disabled: true }, Validators.required],
      lastName: [{ value: 'Boomsma', disabled: true }, Validators.required],
      age: [{ value: 36, disabled: true }, Validators.required],
    });
  }

  public toggleEdit(): void {
    this.profileForm.disabled ? this.profileForm.enable() : this.profileForm.disable();
    this.profileForm.reset();
  }

  public resetForm(): void {
    this.profileForm.reset();
    this.profileForm.disable();
  }

  public submitForm(): void {
    if(this.profileForm.valid) {
      this.profileForm.disable();
    }
  }
}
