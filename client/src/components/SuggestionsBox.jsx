import React from "react";
import { IoPersonAddSharp, IoPersonOutline } from "react-icons/io5";

const SuggestionsBox = React.memo(
  ({ _id, name, mutualFriends, sharedHobbies, sendFriendRequest }) => {
    return (
      <article className="suggestion-box bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col items-start space-y-3">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-4">
            <IoPersonOutline
              className="user-icon w-12 h-12 text-gray-500"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <h4
                id={`suggestion-${_id}`}
                className="name text-lg font-semibold text-gray-800"
              >
                {name}
              </h4>
              <p className="text-sm text-gray-600">
                {2 * mutualFriends > sharedHobbies
                  ? `${mutualFriends} mutual friends`
                  : `${sharedHobbies} hobbies shared`}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => sendFriendRequest(_id)}
          className="suggestion-button bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Send friend request to ${name}`}
        >
          <IoPersonAddSharp
            className="suggestion-icon w-5 h-5"
            aria-hidden="true"
          />
          <span>Send Request</span>
        </button>
      </article>
    );
  }
);

export default SuggestionsBox;
