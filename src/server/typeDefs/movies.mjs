import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const movieTypeDefs = gql`
  type ReturnObjectMovie {
    data: [Movie],
    response: Response
  }

  type Response {
    type: String
    code: String,
  }

  type Movie {
    id: ID
    title: String
  }

  type Query {
    searchMovies(
      query: String!
    ): ReturnObjectMovie
  }
`

export default movieTypeDefs
