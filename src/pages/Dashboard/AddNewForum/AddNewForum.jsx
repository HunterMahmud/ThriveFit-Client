import { useForm } from "react-hook-form";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useRole from "./../../../hooks/useRole";

const AddNewForum = () => {
  const [userRole, roleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthProvider();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (postInfo) => {
    // console.log(postInfo);
    try {
      // Add user info to the form data
      const postData = {
        ...postInfo,
        author: user.displayName,
        email: user.email,
        role: userRole,
        upvote: 0,
        downvote: 0,
      };
      // console.log(postData);
      const { data } = await axiosSecure.post("/forums", postData);
      if (data?.insertedId) {
        toast.success("Forum post added successfully");
        reset();
      }
    } catch (error) {
      console.error("Error adding forum post:", error);
      toast.error("Failed to add forum post");
    }
  };

  if (roleLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg my-7">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Add New Forum Post
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            placeholder="Enter the title of your post"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            {...register("content", { required: true })}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            rows="5"
            placeholder="Write your post content here"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            {...register("imageUrl")}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            placeholder="Enter the image URL for your post"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddNewForum;
