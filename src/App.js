// src/App.jsx

import React, { useCallback, useMemo, useState } from "react";
import Button from "./components/Button";
import List from "./components/List";

// 리액트에서 랜더링되는 경우
// 1. 부모 컴포넌트가 렌더링된 경우
// 2. 컴포넌트의 state가 변경된 경우
// 3. 부모로부터 전달받은 props값이 변경된 경우

// memo라는 함수는 컴포넌트에 변경된 사항이 없을 경우 불필요한 리렌더링을 막는 함수이다.
// useCallback이라는 Hook은 컴포넌트가 리렌더링되더라도 생성된 함수를 새로 만들지 않고 재사용하고자 할 때 사용하는 Hook이다.
// let으로 선언된 변수는 값이 바뀌어도 어차피 리렌더링이 되지 않으므로, 이러한 Hook을 쓰는 것이 의미가 없다.

const App = () => {
  // 이 state가 바뀌면 App.js가 리렌더링 된다.
  const [value, setValue] = useState("");

  // App.js가 리렌더링 될때마다 재생성됨
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  // App.js가 리렌더링 될때마다 재생성됨
  // 의존성 배열안의 값이 바뀔때만 해당 함수가 재생성된다.
  const onClickHandler = useCallback(() => {
    console.log("hello button!");
  }, []);

  // useCallback의 사용대상은 함수, useMemo의 사용대상은 객체나 배열과 같은 값이다.
  const data = useMemo(() => {
    return [
      {
        id: 1,
        title: "react",
      },
    ];
  }, []);

  return (
    <div>
      <input type="text" value={value} onChange={onChangeHandler} />
      {/* 매번 재생성되는 함수를 props로 넘겨줌 -> Button.js 리렌더링 유발 */}
      <Button onClick={onClickHandler} />
      {/* props로 받은 배열이 App.js가 리렌더링될 때마다 재생성되므로 List가 memo를 사용해도 재생성 */}
      <List data={data} />
    </div>
  );
};

export default App;

// useCallback이나 useMemo의 무분별한 사용은 오히려 퍼포먼스 성능에 악영향을 미칠 수 있다.
// 반드시 리렌더링이 필요한 component나 값에는 이 최적화 Hook을 사용하는 것이 오히려 좋지가 않다.
// 의도치 않게 업데이트가 되지 않는 상황이 있을 수 있기 때문이다.
// 또한 이것들을 사용시 리액트에게 렌더링 이후의 값과 이전의 값을 비교해서 같으면 재생성하고 같지 않으면 재생성하지 않도록 주문을 하므로
// 전과 후의 값을 비교하는 과정이 추가가 되므로 이런 Hook들의 무분별한 남용은 불필요한 비교과정을 추가하므로 퍼포먼스 성능에 악영항이 될 수 있다.
