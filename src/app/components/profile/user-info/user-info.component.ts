import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class UserInfoComponent implements OnInit {
  private authService = inject(AuthService)
  public profileForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.setProfileForm();
  }

  private setProfileForm(): void {
    this.profileForm = this.formBuilder.nonNullable.group({
      username: [{ value: this.authService.getCurrentUser().username, disabled: true }],
    });
  }
}
