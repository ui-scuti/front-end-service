
import React, { useState } from "react";
import './loader.css';



function Loader(props) {
  const [isCollapsed, setCollapsed] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div className="lds-ripple"><div></div><div></div></div>
      <div> {props.text}</div>
    </div>

  );
}

export default Loader;
