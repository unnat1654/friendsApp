import React from 'react'

const PostsBox = ({name, text}) => {
  return (
    <div className='post-box'>
        <IoPersonOutline className="user-icon" />
        <span className="name">{name}</span>
        <p>{text}</p>
    </div>
  );
};

export default PostsBox;