
import React, { useState } from "react";
// import './hint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Hint(props) {
  return (
    <>
      <div className="sheet">
        <div className="l-margin margin">
          <div className="hole first-hole"></div>
          <div className="hole second-hole"></div>
          <div className="hole third-hole"></div>
        </div>
        <div className="r-margin margin"></div>
        <header>
          <span className="sheet-title">
            Marilyn Monroe
  </span>
        </header>
        <p className="sheet-text">I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they're right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together.</p>
      </div>
    </>
  );
}

export default Hint;
