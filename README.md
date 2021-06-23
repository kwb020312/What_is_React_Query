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
