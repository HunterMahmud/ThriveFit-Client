import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const axiosPublic = useAxiosPublic();
  const handleNewsLetter = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // console.log(name, email);
    const newsLetterInfo = { name, email };
    axiosPublic
      .post("/newsletter", newsLetterInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data?.insertedId) {
          toast.success("Thanks for subscribe!");
          form.reset();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <section className="">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-3xl sm:text-5xl tracking-tight font-extrabold text-center text-gray-900 ">
          Subscribe for our <span className="text-blue-500">Newsletter</span>
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
          Stay updated with the latest fitness tips, exclusive offers, and
          events at ThriveFit. Subscribe to our newsletter and join our thriving
          fitness community.
        </p>
        <form onSubmit={handleNewsLetter} className="space-y-8">
          {" "}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
