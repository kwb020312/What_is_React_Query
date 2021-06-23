## React Query

<img src="gitImages\React_Query_Logo.jpg">

해당 Repository는 React Query의 공식문서를 보고 작성되었음을 미리 밝힙니다.

<a href="https://react-query.tanstack.com/overview">React Query 공식문서 바로가기</a>

<blockquote cite="https://react-query.tanstack.com/overview"><i>
React Query는 종종 React의 누락 된 데이터 가져 오기 라이브러리로 설명되지만 더 기술적 인 용어로 보면 React 애플리케이션에서 서버 상태 를 가져오고, 캐시하고, 동기화하고, 업데이트 하는 작업이 수월해집니다.</i></blockquote>

기본적으로 서버작업의 큰 도움을 준다는 것을 알 수 있다. 설치과정부터 React Query가 필요한 점까지 모두 배워보자.

## 설치

NPM & Yarn

```javascript
 $ npm i react-query

 $ yarn add react-query
```

CDN

```html
<script src="https://unpkg.com/react-query/dist/react-query.production.min.js"></script>
```

위의 과정으로 손쉽게 설치가 가능하다.

## Debugging

디버깅은 별도의 모듈 설치 필요없이 내장되어있으며 매우 간단하게 꺼내와 사용이 가능하다

```javascript
import { ReactQueryDevtools } from "react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <!-- 해당 구문 작성시 DevTools가 동작한다 -->
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

Embedded모드로

```html
<ReactQueryDevtoolsPanel style="{styles}" className="{className}" />
```

또한 Devtool 이다.

※ 아쉽게도 현재 React-Native는 해당 Devtools가 지원하지 않는다.

## useQuery

React-Query 에서 가장 중요한 Method는 useQuery인데,

```javascript
import { useQuery } from "react-query";

const data = useQuery("이름", fetch함수);
```

로 전달하게되면 다양한 상태값이 반환된다

<img src="gitImages\State.jpg">
<img src="gitImages\Return_Data.jpg">

useQuery 는 다양한 값으로 구조분해할당이 가능한데

```javascript
import { useQuery, QueryClientProvider, QueryClient } from "react-query";

function InnerComp() {
  // 내 경우 상태와 데이터를 할당받았다
  const { status, data } = useQuery(["todos"], () => {
    return fetch(
      "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits"
    )
      .then((res) => res.json())
      .then((res) => res[0].author.login);
  });
  // 상태는 success , error , loading 이 있음
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
    // QueryClientProvider로 컴포넌트를 감싸주어야 실행됨
    <QueryClientProvider client={queryClient}>
      <InnerComp />
    </QueryClientProvider>
  );
}

export default App;
```

<img src="gitImages\Fetch_Success.jpg" />

## Key

useQuery를 사용할 때

```javascript
useQuery("key", callback);
```

의 형태를 사용하곤 한다. 이 때
key는 react-query의 식별자로써 사용되며 배열또한 사용 가능하다. 즉

```javascript
useQuery(["todos", "test"], callback);
```

을 준 경우 아래와 같이 표시된다

<img src="gitImages\DevState.jpg">

## error catch

error를 잡으려면 어떻게해야할까??

```javascript
const { error } = useQuery("key", () => {
  // callback 함수 진행
  if (error) {
    throw new Error("NewtWork Error!!");
  }
});
```

하면 error 변수에 구조분해 할당으로 들어가게 됨.

## useIsFetching

useIsFetching을 통해 현재 fetch된 데이터가 완전히 호출되어 들어왔는지를 확인할 수 있으며 React Application에서 흔하게 볼 수 있는

```javascript
if (isfetch) {
  return <h1>Now Loading..</h1>;
}
```

과 같은 구문을

```javascript
import { useIsFetching } from "react-query";
const isFetching = useIsFetching();

if (isFetching) {
  return <h1>Loading..</h1>;
} else {
  return (
    <h1>
      Status : {status} , Data : {data}
    </h1>
  );
}
```

위와 같이 설정할 수 있다.

## refetchOnWindowFocus

refetchOnWindowFocus를 false로 설정하면 비활성화가 가능하다 사용 방법은

```javascript
const { data } = useQuery("todos", callback, { refetchOnWindowFocus: false });
```

## enabled

useQuery의 3번째 인자로 enabled를 false하면 컴포넌트가 호출되어도 자동으로 fetch하지 않음

```javascript
useQuery("todos", callback, {
  // 컴포넌트가 로드될 때 자동으로 fetch하지 않겠다고 선언
  enabled: false,
});
```

## retry

useQuery를 쓰며 실패한 요청을 자동으로 다시 재시도 할 수 있는데 이에 몇 번 재시도 할것인지 정해주는 것과 딜레이를 입력해줄 수 있다.

```javascript
useQuery("todos", callback, {
  // 요청 실패시 10번 반복함
  retry: 10,
});

// ... App최상단 Client 정의부
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (idx) => 연산처리,
    },
  },
});

useQuery("todos", callback, {
  retryDelay: 값,
});
```
