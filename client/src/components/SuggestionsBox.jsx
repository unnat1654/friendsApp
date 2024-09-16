import React from "react";
import { IoPersonAddSharp, IoPersonOutline } from "react-icons/io5";

const SuggestionsBox = React.memo(({_id, name, mutualFriends, sharedHobbies,sendFriendRequest}) => {
  return (
    <article className="suggestion-box" aria-labelledby={`suggestion-${_id}`}>
      <IoPersonOutline className="user-icon" aria-hidden="true" />
      <h4 id={`suggestion-${_id}`} className="name">{name}</h4>
      <p className="sub-text">
        {2 * mutualFriends > sharedHobbies
          ? `${mutualFriends} mutual friends`
          : `${sharedHobbies} hobbies shared`}
      </p>
      <button onClick={()=>sendFriendRequest(_id)} className="suggestion-button" aria-label={`Send friend request to ${name}`}>
        <IoPersonAddSharp className="suggestion-icon" aria-hidden="true"/> Send Request
      </button>
    </article>
  );
});

export default SuggestionsBox;
