import React from "react";
import { IoBan, IoPersonOutline } from "react-icons/io5";

const FriendsBox = React.memo(({ _id, name, removeFriend }) => {
  return (
    <article className="friend-box bg-white p-4 rounded-lg shadow-md border border-gray-300 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <IoPersonOutline
          className="user-icon w-12 h-12 text-gray-500"
          aria-hidden="true"
        />
        <h4
          id={`friend-${_id}`}
          className="name text-lg font-semibold text-gray-800"
        >
          {name}
        </h4>
      </div>
      <button
        onClick={() => removeFriend(_id)}
        className="unfriend-button bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label={`Unfriend ${name}`}
      >
        <IoBan className="unfriend-icon w-6 h-6" />
      </button>
    </article>
  );
});

export default FriendsBox;
