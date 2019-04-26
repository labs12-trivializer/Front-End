import React from 'react';

const Restricted = props => {

  return (
    <div>
      <h4>You are not logged in!</h4>
      <p>Please <button onClick={props.login}>Log In</button> to continue.</p>
    </div>
  )
}

export default Restricted;