import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  useIsFetching,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function InnerComp() {
  const { status, data, isPreviousData } = useQuery(
    ["todos", "test"],
    () => {
      return fetch(
        "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits"
      )
        .then((res) => res.json())
        .then((res) => res[0].author.login);
    },
    {
      keepPreviousData: true,
    }
  );

  const isFetching = useIsFetching();

  if (isFetching) {
    return <h1>Loading..</h1>;
  } else {
    return (
      <h1>
        Status : {status} , Data : {data}, isPreviousData :{" "}
        {isPreviousData.toString()}
      </h1>
    );
  }
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <InnerComp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
