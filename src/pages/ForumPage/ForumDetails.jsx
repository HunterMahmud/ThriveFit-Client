// components/ForumDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const ForumDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthProvider();
  const queryClient = useQueryClient();
  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${id}`);
      return data;
    },
  });
  // console.log(post);
  const handleVote = async (type) => {
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
      toast.success("Voted");
      queryClient.invalidateQueries(["posts"]);
    } catch (error) {
      toast.error("Error while voting.");
    }
  };
  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <Helmet>
        <title>ThriveFit | Loading Post</title>
      </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        <Helmet>
        <title>ThriveFit | Error Loading post Details</title>
      </Helmet>
        Error loading post details...
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto my-10 p-4  text-gray-900">
        <Helmet>
        <title>ThriveFit | {post.title}</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 capitalize text-center text-gray-900 ">
        {post.title}
      </h1>
      <div className="post bg-white border text-gray-900 p-4 rounded shadow-md">
        <img
          src={post.imageUrl || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
          alt={post.title}
          className="my-2 w-full h-96 object-cover rounded"
        />

        <p className="text-xl mt-4 flex justify-start items-center">Author: {post.author} {post.role === "admin" && (
                <span className="ml-2 text-yellow-400">
                  <FaUserShield className="text-xl" title="Admin" />
                </span>
              )}
              {post.role === "trainer" && (
                <span className="ml-2 text-green-500">
                  <FaChalkboardTeacher className="text-xl" title="Trainer" />
                </span>
              )}</p>
        <p className="mt-2">{post.content}</p>
        <div className="flex items-center mt-4 gap-4">
          <button
            onClick={() => handleVote("upvote")}
            className="flex items-center space-x-2 text-blue-600"
          >
            <FaThumbsUp /> <span>{post.upvote}</span>
          </button>
          <button
            onClick={() => handleVote("downvote")}
            className="flex items-center space-x-2 text-red-600"
          >
            <FaThumbsDown /> <span>{post.downvote}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;
