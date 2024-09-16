import React from "react";
import { IoBan, IoPersonOutline } from "react-icons/io5";

const FriendsBox = React.memo(({ _id, name, removeFriend }) => {

  return (
    <article className="friend-box" aria-labelledby={`friend-${_id}`}>
      <IoPersonOutline className="user-icon" aria-hidden="true" />

      <h4 id={`friend-${_id}`}  className="name">{name}</h4>

      <button onClick={()=>removeFriend(_id)} className="unfriend-button" aria-label={`Unfriend ${name}`}>
        <IoBan className="unfriend-icon" />
      </button>
    </article>
  );
});

export default FriendsBox;
