import React from 'react';

const Alert = (props) => {
  return (
    <div className="ui floating message">
      <p>{props.message}</p>
    </div>
  );
}

export default Alert;