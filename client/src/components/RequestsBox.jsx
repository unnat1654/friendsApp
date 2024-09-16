import React from "react";
import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoPersonOutline,
} from "react-icons/io5";

const RequestsBox = React.memo(({ _id, sender, removeRequest}) => {
  
  return (
    <article className="friend-box" aria-labelledby={`request-${_id}`}>
      <IoPersonOutline className="user-icon" aria-hidden="true"/>

      <h4 id={`request-${_id}`} className="name">{sender.name}</h4>

      <button onClick={() => removeRequest(_id,"ACCEPT")} className="accept-button" aria-label={`Accept request from ${sender.name}`}>
        <IoCheckmarkSharp className="accept-icon" aria-hidden="true"/>
      </button>
      <button onClick={() => removeRequest(_id,"REJECT")} className="reject-button" aria-label={`Reject request from ${sender.name}`}>
        <IoCloseSharp className="reject-icon" aria-hidden="true"/>
      </button>
    </article>
  );
});

export default RequestsBox;
