import { gql } from "graphql-request";

export const UpdateScheduledMessageStatus = gql`
  mutation UpdateScheduledMessageStatus($id: uuid!) {
    update_message_by_pk(pk_columns: { id: $id }, _set: { status: "sent" }) {
      id
    }
  }
`;
