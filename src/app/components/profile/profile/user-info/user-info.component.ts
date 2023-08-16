import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class UserInfoComponent implements OnInit {
  public profileForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.setProfileForm();
  }

  private setProfileForm(): void {
    this.profileForm = this.formBuilder.nonNullable.group({
      userName: [{ value: 'alucardu', disabled: true }, Validators.required],
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
