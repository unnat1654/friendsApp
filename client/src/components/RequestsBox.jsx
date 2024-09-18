import React from "react";
import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoPersonOutline,
} from "react-icons/io5";

const RequestsBox = React.memo(({ _id, name, removeRequest }) => {
  return (
    <article className="friend-box bg-white p-4 rounded-lg shadow-md border border-gray-300 flex items-center space-x-4">
      <IoPersonOutline
        className="user-icon w-12 h-12 text-gray-500"
        aria-hidden="true"
      />

      <div className="flex flex-col flex-grow">
        <h4
          id={`request-${_id}`}
          className="name text-lg font-semibold text-gray-800 mb-2"
        >
          {name}
        </h4>
        <div className="flex space-x-2">
          <button
            onClick={() => removeRequest(_id, "ACCEPT")}
            className="accept-button bg-green-500 text-white rounded-lg py-1 px-2 flex items-center space-x-1 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label={`Accept request from ${name}`}
          >
            <IoCheckmarkSharp
              className="accept-icon w-5 h-5"
              aria-hidden="true"
            />
            <span>Accept</span>
          </button>
          <button
            onClick={() => removeRequest(_id, "REJECT")}
            className="reject-button bg-red-500 text-white rounded-lg py-1 px-2 flex items-center space-x-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label={`Reject request from ${name}`}
          >
            <IoCloseSharp className="reject-icon w-5 h-5" aria-hidden="true" />
            <span>Reject</span>
          </button>
        </div>
      </div>
    </article>
  );
});

export default RequestsBox;
