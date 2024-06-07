// components/Forum.js
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

const ForumPage = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosSecure.get(`/api/posts?page=${queryKey[1]}`);
      return data;
    },
    keepPreviousData: true,
  });

  const handleVote = async (id, type) => {
    if (!user) {
      toast.error("You need to log in to vote.");
      return;
    }

    const endpoint =
      type === "upvote" ? `/posts/${id}/upvote` : `/posts/${id}/downvote`;

    try {
      await axiosSecure.patch(endpoint);
      toast.success("Voted");
      queryClient.invalidateQueries(["posts", currentPage]);
    } catch (error) {
      toast.error("Error while voting.");
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > data.totalPages) return;
    setCurrentPage(page);
  };

  const renderContentPreview = (content) => {
    const maxLength = 50;
    return content.length > maxLength
      ? `${content.slice(0, maxLength)}...`
      : content;
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        Error loading post data...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 my-10">
        Forum
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.posts?.map((post) => (
          <div
            key={post._id}
            className="post bg-white text-gray-800 p-4 border rounded-md shadow-lg"
          >
            <Link to={`/forum/${post._id}`}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="my-2 w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold capitalize">{post.title}</h2>
            </Link>
            <p className="font-semibold flex items-center">
              Author: {post.author}{" "}
              {post.role === "admin" && (
                <span className="ml-2 text-yellow-400">
                  <FaUserShield className="text-xl" title="Admin" />
                </span>
              )}
              {post.role === "trainer" && (
                <span className="ml-2 text-green-500">
                  <FaChalkboardTeacher className="text-xl" title="Trainer" />
                </span>
              )}
            </p>
            <p>{renderContentPreview(post.content)}</p>
            <Link to={`/forum/${post._id}`} className="text-blue-600">
              Read More
            </Link>
            <div className="flex items-center mt-2 gap-4">
              <button
                onClick={() => handleVote(post._id, "upvote")}
                className="flex items-center space-x-2 text-blue-600"
              >
                <FaThumbsUp /> <span>{post.upvote}</span>
              </button>
              <button
                onClick={() => handleVote(post._id, "downvote")}
                className="flex items-center space-x-2 text-red-600"
              >
                <FaThumbsDown /> <span>{post.downvote}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {data.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
