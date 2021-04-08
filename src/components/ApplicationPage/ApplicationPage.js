import React from "react";
import "./ApplicationPage.css";
import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2/Stage2";
import Stage3 from "./Stage3/Stage3";
import Stage4 from "./Stage4";

export default ({
  currentProgress,
  onChange,
  advance,
  previous,
  answers,
  languages,
}) => {
  switch (currentProgress) {
    case 0:
      return <Stage0 advance={advance} />;
    case 1:
      return (
        <Stage1
          onChange={onChange}
          previous={previous}
          advance={advance}
          answers={answers}
        />
      );
    case 2:
      return (
        <Stage2
          onChange={onChange}
          previous={previous}
          advance={advance}
          answers={answers}
          languages={languages}
        />
      );
    case 3:
      return <Stage3 onChange={onChange} advance={advance} languages={languages} />;
    case 4:
      return <Stage4 />;
    default:
      return <div>error</div>;
  }
};
