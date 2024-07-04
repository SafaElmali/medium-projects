const axios = require("axios");

const HASURA_URL = process.env.HASURA_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

type CreateScheduledEventArgs = {
  webhook: string;
  scheduleAt: string;
  payload: Record<string, unknown>;
  headers?: Record<string, string>;
  comment: string;
};

const createScheduledEvent = async ({
  webhook,
  scheduleAt,
  payload,
  headers,
  comment,
}: CreateScheduledEventArgs) => {
  console.log("Creating scheduled event...", {
    webhook,
    scheduleAt,
    payload,
    headers,
    comment,
  });
  const response = await axios({
    method: "post",
    url: HASURA_URL,
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    data: {
      type: "create_scheduled_event",
      args: {
        webhook,
        schedule_at: scheduleAt,
        payload,
        comment,
      },
    },
  }).catch((error) => {
    console.error("Error creating scheduled event:", error);
  });

  const eventId = response.data.event_id;
  const message = response.data.message;

  return {
    data: {
      eventId,
      message,
    },
  };
};

export { createScheduledEvent };
