import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    cache: new InMemoryCache({
      addTypename: false
    }),
    link: httpLink.create({
      uri: `${environment.graphQLserverUri}`,
      withCredentials: true,
    })
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
