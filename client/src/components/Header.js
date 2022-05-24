import React from "react";

const Header = (props) => {
  return (
    <div className="header">
      <div>Home</div>
      <div>
        <button onClick={() => props.alternateDebugMode()}>Debug Mode</button>
      </div>
      <div>Other Page</div>
    </div>
  );
};

export default Header;
