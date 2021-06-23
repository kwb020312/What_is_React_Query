import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function InnerComp() {
  const { status, data } = useQuery(["todos", "test"], () => {
    return fetch(
      "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits"
    )
      .then((res) => res.json())
      .then((res) => res[0].author.login);
  });

  if (status === "success") {
    return (
      <h1>
        Status : {status} , Data : {data}
      </h1>
    );
  } else {
    return <h1>Loading..</h1>;
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
