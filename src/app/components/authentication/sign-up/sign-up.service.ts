import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';

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

  public createUser(userForm: FormGroup): Observable<MutationResult<CreateUser>> {
    const user: IUser = userForm.value
    return this.apollo.mutate<CreateUser>({
      mutation: CREATE_USER,
      variables: {
        username: user.username,
        email: user.email
      },
    })
  }
}
