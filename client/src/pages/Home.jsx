import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import FriendsBox from "../components/FriendsBox";
import SuggestionsBox from "../components/SuggestionsBox";
import RequestsBox from "../components/RequestsBox";
import PostsBox from "../components/PostsBox";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/loading.gif";

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
  const [postText, setPostText] = useState("");

  const navigate = useNavigate();

  const removeFriend = useCallback(async (_id) => {
    try {
      const { data } = await axios.patch(
        "https://friendsapp-jfkv.onrender.com/api/friends/remove-friend",
        { user_id: _id }
      );
      if (data?.success)
        setFriends((prev) => prev.filter((friend) => friend._id !== _id));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, []);

  const addHobby = useCallback(async () => {
    try {
      const { data } = await axios.patch(
        "https://friendsapp-jfkv.onrender.com/api/hobby/add-hobby",
        { hobby: newHobby }
      );
      if (data?.success) {
        setHobbies((prev) => [...prev, newHobby]);
        setNewHobby("");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, [newHobby]);

  const removeHobby = useCallback(async (hobby) => {
    try {
      const { data } = await axios.patch(
        "https://friendsapp-jfkv.onrender.com/api/hobby/remove-hobby",
        { hobby }
      );
      if (data?.success)
        setHobbies((prev) => prev.filter((hobby_item) => hobby_item !== hobby));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, []);

  const removeRequest = useCallback(async (_id, choice) => {
    try {
      const { data } = await axios.delete(
        "https://friendsapp-jfkv.onrender.com/api/request/handle-request",
        { params: { request_id: _id, choice } }
      );
      if (data?.success)
        setRequests((prev) => prev.filter((request) => request._id !== _id));
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, []);

  const sendFriendRequest = useCallback(async (_id) => {
    try {
      const { data } = await axios.post(
        "https://friendsapp-jfkv.onrender.com/api/request/send-request",
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
  }, []);

  const searchUsers = useCallback(async (search) => {
    try {
      const { data } = await axios.get(
        `https://friendsapp-jfkv.onrender.com/api/friends/search-users`,
        {
          params: { search },
        }
      );
      if (data?.success) setSuggestions(data.recommendations);
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, []);

  const handlePostCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://friendsapp-jfkv.onrender.com/api/post/create-post",
        {
          text: postText,
        }
      );

      if (data?.success) {
        setPostText("");
      }
    } catch (error) {
      console.error("Error publishing post", error);
      alert("Failed to publish post.");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        friendsResult,
        suggestionsResult,
        hobbiesResult,
        requestsResult,
        postsResult,
      ] = await Promise.all([
        axios.get(
          "https://friendsapp-jfkv.onrender.com/api/friends/get-friends"
        ),
        axios.get(
          "https://friendsapp-jfkv.onrender.com/api/friends/search-users"
        ),
        axios.get("https://friendsapp-jfkv.onrender.com/api/hobby/get-hobbies"),
        axios.get(
          "https://friendsapp-jfkv.onrender.com/api/request/get-requests"
        ),
        axios.get("https://friendsapp-jfkv.onrender.com/api/post/get-posts"),
      ]);

      if (friendsResult?.data?.success) setFriends(friendsResult.data.friends);
      if (suggestionsResult?.data?.success)
        setSuggestions(suggestionsResult.data.recommendations);
      if (hobbiesResult?.data?.success) setHobbies(hobbiesResult.data.hobbies);
      if (requestsResult?.data?.success)
        setRequests(requestsResult.data.requests);
      if (postsResult?.data?.success) setPosts(postsResult.data.posts);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  }, []);
  useEffect(() => {
    if (auth?.token) fetchData();
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [auth?.token]);

  return (
    <div>
      <img className={`flex mx-auto my-[50vh] translate-y-[-50%] ${!loading && "hidden"}`} src={Loading} alt="loading" />
      <main
        className={`${
          loading && "hidden"
        } home md:max-h-screen grid md:grid-cols-[1fr_3fr_1fr] gap-4`}
      >
        <aside className="friends md:h-screen flex flex-col justify-start items-center">
          <header className="left-heading m-5 flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-700">Show</span>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="FRIENDS">Friends</option>
              <option value="REQUESTS">Requests</option>
            </select>
          </header>
          <div className="flex flex-col gap-5 w-[90%] h-[80vh] max-h-[100vh] overflow-y-auto">
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
                    name={request.sender.name}
                    removeRequest={removeRequest}
                  />
                ))}
          </div>
        </aside>
        <section className="center-section max-h-[100vh] overflow-y-auto">
          <form
            className="create-post bg-white p-6"
            onSubmit={handlePostCreate}
          >
            <label
              htmlFor="post-textarea"
              className="text-xl block font-semibold mb-5 text-gray-800"
            >
              Hi, {auth && auth.name.split(" ")[0]}
            </label>
            <textarea
              id="post-textarea"
              rows={3}
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <button
              type="submit"
              className="create-post-button mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Publish Post
            </button>
          </form>
          <article className="hobbies bg-white p-4">
            <header className="hobbies-heading mb-5 block text-lg font-semibold text-gray-700">
              Share your hobbies:
            </header>
            <div className="mb-4 flex justify-evenly">
              <input
                className="hobbies-input w-[40%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Eg. Walking, Reading..."
              />
              <button
                className="add-hobby mt-2 w-[40%] py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={addHobby}
              >
                Add Hobby
              </button>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
              {hobbies.map((hobby, index) => (
                <div
                  className="hobby-item flex items-center justify-between gap-1 bg-blue-400 py-2 px-4 rounded-2xl"
                  key={index}
                >
                  <span className="hobby-text text-gray-800">{hobby}</span>
                  <button
                    className="hobby-remove text-red-500 hover:text-red-600 focus:outline-none"
                    onClick={() => removeHobby(hobby)}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </article>
          <article className="posts">
            {posts.map((post) => (
              <PostsBox
                name={post.sender.name}
                key={post._id}
                text={post.text}
              />
            ))}
          </article>
        </section>
        <aside className="suggestions md:h-screen flex flex-col justify-start items-center">
          <header className="right-heading m-6 text-lg font-semibold text-gray-700">
            Explore
          </header>
          <SearchBar searchUsers={searchUsers} />
          <div className="flex flex-col gap-5 w-[90%] h-[80vh] max-h-[100vh] overflow-y-auto">
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
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
