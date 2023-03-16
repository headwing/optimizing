// components/Button.js

import React from "react";
import { memo } from "react";

// props를 넘겨주지 않는 경우에는 memo만 사용해도 리렌더링이 일어나지 않는다.
const Button = ({ onClick }) => {
  console.log("Button : 리렌더링되고 있어요.");
  return <button onClick={onClick}>버튼</button>;
};

export default memo(Button);
