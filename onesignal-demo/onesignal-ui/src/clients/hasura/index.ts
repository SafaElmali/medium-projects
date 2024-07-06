import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createHttpLink = () => {
  return new HttpLink({
    uri: import.meta.env.VITE_HASURA_PROD_GRAPHQL_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": import.meta.env.VITE_HASURA_PROD_ADMIN_SECRET,
    },
  });
};

const createApolloClient = () => {
  return new ApolloClient({
    link: createHttpLink(),
    cache: new InMemoryCache(),
  });
};

export const client = createApolloClient();
