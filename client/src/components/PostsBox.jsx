import React from "react";
import { IoPersonOutline } from "react-icons/io5";

const PostsBox = ({ name, text }) => {
  return (
    <div className="post-box bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
      <IoPersonOutline className="user-icon w-12 h-12 text-gray-500" />
      <div className="post-content flex-1">
        <span className="name text-lg font-semibold text-gray-800 block mb-1">
          {name}
        </span>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default PostsBox;
