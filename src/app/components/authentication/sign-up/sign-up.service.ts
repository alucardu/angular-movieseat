import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/mock/watchlist.json';

import { CREATE_USER } from 'src/operations/userOperations/mutations';
import { CONFIRM_USER } from 'src/operations/userOperations/queries';
import { ConfirmUser, CreateUser, } from 'src/types/userTypes';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
  movies: IMovie[]
  friends: IUser[]
  friendOf: IUser[]
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
        email: user.email,
        password: user.password
      },
    })
  }

  public confirmUser(confirmationForm: FormGroup): Observable<ApolloQueryResult<ConfirmUser>> {
    const formData = confirmationForm.value
    const confirmationCode = `${formData.digit1}${formData.digit2}${formData.digit3}${formData.digit4}`
    return this.apollo.query<ConfirmUser>({
      query: CONFIRM_USER,
      variables: {
        id: formData.userId,
        confirmationCode: confirmationCode
      }
    })
  }
}
