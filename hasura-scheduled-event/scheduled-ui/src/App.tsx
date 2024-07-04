import { gql, useQuery } from "@apollo/client";
import { ScheduleMessageModal } from "./components/ScheduleMessageModal";
import { ScheduleMessageTable } from "./components/ScheduleMessageTable";

const GET_MESSAGES = gql`
  query GetMessages {
    message {
      text
      scheduled_at
      status
    }
  }
`;

const App = () => {
  const { data, refetch } = useQuery(GET_MESSAGES, {
    pollInterval: 3000,
  });

  return (
    <div className="p-4 flex flex-col">
      <ScheduleMessageModal onClose={() => refetch()} />
      <ScheduleMessageTable data={data?.message || []} />
    </div>
  );
};

export default App;
