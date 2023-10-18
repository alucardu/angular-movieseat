import { Injectable, inject } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { SEARCH_PERSON } from 'src/operations/movieOperations/queries';
import { SearchPerson } from 'src/types/movieTypes';

@Injectable({
  providedIn: 'root'
})
export class BiographyService {
  private apollo = inject(Apollo)

  public getPersonData(id: number): Observable<ApolloQueryResult<SearchPerson>> {
    return this.apollo.query<SearchPerson>({
      query: SEARCH_PERSON,
      variables: {
        id: id
      }
    })
  }
}
