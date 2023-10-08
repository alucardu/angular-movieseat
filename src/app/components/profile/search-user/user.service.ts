import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { IUser } from '../../authentication/sign-up/sign-up.service';
import { GET_ALL_USERS, GET_USERS } from 'src/operations/userOperations/queries';
import { GetAllUsers, GetUsers } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apollo = inject(Apollo)

  private allUsersSubject$ = new Subject<IUser[]>()
  public allUsers$ = this.allUsersSubject$.asObservable();

  private userSearchResultsSubject$ = new Subject<IUser[]>();
  public userSearchResults$ = this.userSearchResultsSubject$.asObservable();

  public getUser(query: string): void {
    this.apollo.query<GetUsers>({
      query: GET_USERS,
      variables: {
        query: query
      }
    }).subscribe({
      next: ({data}) => {
        if (data) {
          this.userSearchResultsSubject$.next(data.getUsers.data)
        }
      },
      error: (data) => console.log(data)
    })
  }

  public getAllUsers(): void {
    this.apollo.query<GetAllUsers>({
      query: GET_ALL_USERS,
    }).subscribe({
      next: ({data}) => this.allUsersSubject$.next(data.getAllUsers.data)
    })
  }
}
