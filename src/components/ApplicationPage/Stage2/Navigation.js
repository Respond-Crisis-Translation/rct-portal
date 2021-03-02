import React from "react";

export default ({ lang }) => {
  return (
    <ul
      style={{ display: "none" }}
      className="uk-subnav uk-subnav-pill"
      uk-switcher="animation: uk-animation-fade"
    >
      <li>
        <a href="/#">support</a>
      </li>
      <li>
        <a href="/#">learn about us</a>
      </li>
      <li>
        <a href="/#">languages</a>
      </li>
      <li>
        <a href="/#">confidence</a>
      </li>
      {lang.map((l, index) => (
        <li key={`${l}${index}wow`}>
          <a href="/#">{l} exp</a>
        </li>
      ))}
      {lang.map((l, index) => (
        <li key={`${l}${index}oralllwow`}>
          <a href="/#">{l} oral</a>
        </li>
      ))}
      <li>
        <a href="/#">prep</a>
      </li>
    </ul>
  );
};
