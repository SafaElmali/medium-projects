import { requestAsAdmin } from "../../../utils/hasura/request";
import { UpdateScheduledMessageStatus } from "./queries";

export interface Request {
  body: string;
}

export interface Node {
  payload: {
    messageId: string;
  };
}

const mainFn = async (request: Request) => {
  console.log("Scheduled event triggered:", request);
  const { payload }: Node = JSON.parse(request.body);

  await requestAsAdmin(UpdateScheduledMessageStatus, {
    id: payload.messageId,
  }).catch((error) => {
    console.error("Error updating scheduled message status:", error);
  });

  return {
    message: "Scheduled event triggered",
  };
};

module.exports.handle = mainFn;
