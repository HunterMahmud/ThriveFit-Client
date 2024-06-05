// components/Forum.js
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";
import useAxiosSecure from './../../hooks/useAxiosSecure';

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
      type === "upvote"
        ? `/posts/${id}/upvote`
        : `/posts/${id}/downvote`;
     
    try {
      await axiosSecure.patch(endpoint);
      toast.success("Voted")
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
    return content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading posts.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-100">Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.posts?.map((post) => (
          <div key={post._id} className="post bg-white p-4 rounded shadow-md">
            <Link to={`/forum/${post._id}`}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="my-2 w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold capitalize">{post.title}</h2>
            </Link>
            <p className="font-semibold">Author: {post.author} <span className="text-[#2377FF] capitalize px-2 bg-[#EBF5FF] rounded-lg  items-center justify-center">{post.role}</span></p>
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
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {data.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
