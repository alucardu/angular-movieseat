import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      userName: [{ value: 'alucardu', disabled: true }],
    });
  }
}
