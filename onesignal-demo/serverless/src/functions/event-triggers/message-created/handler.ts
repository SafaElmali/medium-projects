import { createScheduledEvent } from "../../../utils/hasura/create-scheduled-event";

type Request = {
  body: string;
};

type EventData = {
  event: {
    data: {
      new: {
        created_at: string;
        id: string;
        scheduled_at: string;
        status: string;
        text: string;
        updated_at: string;
      };
      old: null;
    };
  };
};

const mainFn = async (request: Request) => {
  const {
    event: {
      data: { new: node },
    },
  }: EventData = JSON.parse(request.body);

  await createScheduledEvent({
    comment: "Scheduled message sent",
    webhook: `${process.env.SERVERLESS_URL}/scheduled-message-sent`,
    payload: {
      messageId: node.id,
    },
    scheduleAt: node.scheduled_at,
  });

  return {
    message: "Scheduled event triggered",
  };
};

module.exports.handle = mainFn;
