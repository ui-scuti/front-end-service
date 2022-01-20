
import React, { useState } from "react";
import './panel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Panel(props) {
  return (

    <div className="panel-wrapper">
      <div className="panel-title"><i><FontAwesomeIcon icon={props.icon} /></i>{props.title}</div>
      <div className="panel-child">{props.children}</div>
    </div>

  );
}

export default Panel;
