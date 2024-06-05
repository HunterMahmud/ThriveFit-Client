import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa"; 
import useAxiosPublic from './../../hooks/useAxiosPublic';

const LatestPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/latest-posts");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error loading latest posts</div>;
  }

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Latest Community Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg p-4 shadow-md max-w-[400px]">
            <h2 className="text-2xl font-bold text-gray-100">{post.title}</h2>
            <img
              src={post.imageUrl || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={post.title}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <p className="mt-2 text-gray-100">{post.content.substring(0, 100)}...</p>
            <Link to={`/posts/${post._id}`} className="text-blue-500 mt-2 block">Read more</Link>
            <div className="mt-2 flex items-center">
              <p className="text-gray-100">
                <strong>Author:</strong> {post.author}
              </p>
              {post.role === "admin" && (
                <span className="ml-2 text-red-500">
                  <FaUserShield title="Admin" />
                </span>
              )}
              {post.role === "trainer" && (
                <span className="ml-2 text-green-500">
                  <FaChalkboardTeacher title="Trainer" />
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-100">
              <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
