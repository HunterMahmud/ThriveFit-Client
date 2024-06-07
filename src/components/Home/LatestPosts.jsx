import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa"; 
import useAxiosPublic from './../../hooks/useAxiosPublic';
import MaxWidthProvider from "../../hooks/MaxWidthProvider";

const LatestPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/latest-posts");
      return data;
    },
  });
//todo:loading
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
    <MaxWidthProvider>
      <div className="container text-gray-900 max-w-7xl mx-auto ">
      <h1 className="text-3xl font-bold my-10 text-center">Latest Community Posts</h1>
     <div className="mx-2"> <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg p-4 shadow-md max-w-[400px]">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <img
              src={post.imageUrl || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={post.title}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <p className="mt-2 text-gray-800">{post.content.substring(0, 100)}...</p>
            <Link to={`/forum/${post._id}`} className="text-blue-500 mt-2 block">Read more</Link>
            <div className="mt-2 flex items-center">
              <p className="text-gray-800">
                <strong>Author:</strong> {post.author}
              </p>
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
            </div>
            <p className="mt-2 text-gray-800">
              <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div></div>
    </div>
    </MaxWidthProvider>
  );
};

export default LatestPosts;
