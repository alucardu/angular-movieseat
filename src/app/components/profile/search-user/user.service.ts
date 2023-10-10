import { Injectable, inject } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../authentication/sign-up/sign-up.service';
import { GET_ALL_USERS, GET_USERS } from 'src/operations/userOperations/queries';
import { AddFriend, GetAllUsers, GetUsers, RemoveFriend } from 'src/types/userTypes';
import { ADD_FRIEND, REMOVE_FRIEND } from 'src/operations/userOperations/mutations';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apollo = inject(Apollo)

  private allUsersSubject$ = new Subject<IUser[]>()
  public allUsers$ = this.allUsersSubject$.asObservable();

  private userSearchResultsSubject$ = new Subject<IUser[] | null>();
  public userSearchResults$ = this.userSearchResultsSubject$.asObservable();

  public getUser(query: string): void {
    this.apollo.query<GetUsers>({
      query: GET_USERS,
      variables: {
        query: query
      }
    }).subscribe({
      next: ({data}) => {
        if (data.getUsers.data.length > 0) {
          this.userSearchResultsSubject$.next(data.getUsers.data)
        } else {
          this.userSearchResultsSubject$.next(null)
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

  public addFriend(user: IUser): Observable<MutationResult<AddFriend>> {
    return this.apollo.mutate<AddFriend>({
      mutation: ADD_FRIEND,
      variables: {
        id: user.id
      }
    })
  }

  public removeFriend(user: IUser): Observable<MutationResult<RemoveFriend>> {
    return this.apollo.mutate<RemoveFriend>({
      mutation: REMOVE_FRIEND,
      variables: {
        id: user.id
      }
    })
  }

  public clearSearchResults(): void {
    this.userSearchResultsSubject$.next(null)
  }
}
