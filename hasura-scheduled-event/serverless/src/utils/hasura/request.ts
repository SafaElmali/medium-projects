import { GraphQLClient, Variables } from "graphql-request";

export const client = new GraphQLClient(`${process.env.HASURA_URL}`);

export const requestAsAdmin = <T, V extends Variables = Variables>(
  document: string,
  variables: V
): Promise<T> => {
  client.setHeader(
    "x-hasura-admin-secret",
    process.env.HASURA_ADMIN_SECRET as string
  );
  return client.request<T, V>(document, variables);
};
