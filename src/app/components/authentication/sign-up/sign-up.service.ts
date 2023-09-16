import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

export interface IUser {
  username: string;
  email: string;
}

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!) {
    createUser(username: $username, email: $email) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apollo = inject(Apollo)

  public createUser(userForm: FormGroup): Observable<MutationResult<IUser>> {

    const user: IUser = userForm.value
    return this.apollo.mutate<IUser>({
      mutation: CREATE_USER,
      variables: {
        username: user.username,
        email: user.email
      },
    });
  }
}
