import { gql, useQuery } from "@apollo/client";
import { StockTable } from "./components/StockTable";
import { StockModal } from "./components/StockModal";

const GET_STOCK = gql`
  query GetStock {
    stock {
      id
      name
      category
      supplier
      quantity
    }
  }
`;
const App = () => {
  const { data, loading, refetch } = useQuery(GET_STOCK);

  return (
    <div className="p-4 flex flex-col">
      <StockModal onClose={() => refetch()} />
      <StockTable data={data?.message || []} loading={loading} />
    </div>
  );
};

export default App;
