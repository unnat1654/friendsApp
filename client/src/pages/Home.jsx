import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import FriendsBox from "../components/FriendsBox";
import SuggestionsBox from "../components/SuggestionsBox";
import RequestsBox from "../components/RequestsBox";
import PostsBox from "../components/PostsBox";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("FRIENDS");
  const [newHobby, setNewHobby] = useState("");

  const removeFriend = useCallback(async (_id) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:8080/api/friends/remove-friend",
        { user_id: _id }
      );
      if (data?.success)
        setFriends((prev) => prev.filter((friend) => friend._id !== _id));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);

  const addHobby = useCallback(async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:8080/api/hobby/add-hobby",
        { hobby:newHobby }
      );
      if (data?.success) setHobbies((prev) => [...prev, newHobby]);
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);

  const removeHobby = useCallback( async (hobby) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:8080/api/hobby/remove-hobby",
        { hobby }
      );
      if (data?.success)
        setHobbies((prev) => prev.filter((hobby_item) => hobby_item !== hobby));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);

  const removeRequest = useCallback(async (_id, choice) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/hobby/handle-request",
        { request_id: _id, choice }
      );
      if (data?.success)
        setRequests((prev) => prev.filter((request) => request._id !== _id));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);

  const sendFriendRequest = useCallback(async (_id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/request/send-request",
        { user_id: _id }
      );
      if (data?.success)
        setSuggestions((prev) =>
          prev.filter((suggestion) => suggestion._id !== _id)
        );
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [friendsResult, suggestionsResult, hobbiesResult, requestsResult, postsResult] = await Promise.all([
        axios.get("http://localhost:8080/api/friends/get-friends"),
        axios.get("http://localhost:8080/api/hobby/get-mutual-friends"),
        axios.get("http://localhost:8080/api/friends/get-hobbies"),
        axios.get("http://localhost:8080/api/request/get-requests"),
        axios.get("http://localhost:8080/api/post/get-posts")
      ]);

      if (friendsResult?.data?.success)
        setFriends(friendsResult.data.friends);
      if (suggestionsResult?.data?.success)
        setSuggestions(suggestionsResult.data.recommendations);
      if (hobbiesResult?.data?.success)
        setHobbies(hobbiesResult.data.hobbies);
      if (requestsResult?.data?.success)
        setRequests(requestsResult.data.requests);
      if (postsResult?.data?.success)
        setPosts(postsResult.data.posts);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  },[]);
  useEffect(() => {
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  return (
    <main className="home">
      <section className="friends">
        <header className="left-heading">
        <span>Show</span>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="FRIENDS">Friends</option>
          <option value="REQUESTS">Requests</option>
        </select>
        </header>
        {selectedValue == "FRIENDS"
          ? friends.map((friend) => (
              <FriendsBox
                _id={friend._id}
                key={friend._id}
                name={friend.name}
                removeFriend={removeFriend}
              />
            ))
          : requests.map((request) => (
              <RequestsBox
                _id={request._id}
                key={request._id}
                name={request.sender}
                removeRequest={removeRequest}
              />
            ))}
      </section>
      <section className="center-section">
        <article className="create-post">
          <label htmlFor="post-textarea">Create new Post</label>
          <textarea
            id="post-textarea"
            rows={10}
            cols={20}
            placeholder="Share your thoughts..."
          />
          <button className="create-post-button">Publish Post</button>
        </article>
        <article className="hobbies">
          <header className="hobbies-heading">Share your hobbies: </header>
          <input
            className="hobbies-input"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Eg. Walking, Reading..."
          />
          <button className="add-hobby" onClick={addHobby}>
            Add Hobby
          </button>
          {hobbies.map((hobby,index) => (
            <div className="hobby-item" key={index}>
              <span className="hobby-text">{hobby}</span>
              <button className="hobby-remove" onClick={() => removeHobby(hobby)}>
                <IoClose />
              </button>
            </div>
          ))}
        </article>
        <article className="posts">
          {posts.map((post) => (
            <PostsBox name={post.sender.name} key={post._id} text={post.text} />
          ))}
        </article>
      </section>
      <aside className="suggestions">
        <header className="heading">Explore</header>
        {suggestions.map((suggestion) => (
          <SuggestionsBox
            _id={suggestion._id}
            key={suggestion._id}
            name={suggestion.name}
            mutualFriends={suggestion.mutualFriends}
            sharedHobbies={suggestion.sharedHobbies}
            sendFriendRequest={sendFriendRequest}
          />
        ))}
      </aside>
    </main>
  );
};

export default Home;
