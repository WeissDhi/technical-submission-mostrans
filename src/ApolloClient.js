
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // URL GraphQL API
  cache: new InMemoryCache()
});

export default client;
