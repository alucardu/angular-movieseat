import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';

import { CREATE_USER } from 'src/operations/userOperations/mutations';
import { CreateUser } from 'src/types/userTypes';

export interface IUser {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apollo = inject(Apollo)
  private snackBarService = inject(SnackbBarService)

  public createUser(userForm: FormGroup): void {
    const user: IUser = userForm.value
    this.apollo.mutate<CreateUser>({
      mutation: CREATE_USER,
      variables: {
        username: user.username,
        email: user.email
      },
    }).subscribe(({
      next: ({data}) => this.snackBarService.openSnackBar(data!.createUser.message, SnackBarState.SUCCESS),
      error: (data) => this.snackBarService.openSnackBar(data.message, SnackBarState.ERROR)
    }))
  }
}
