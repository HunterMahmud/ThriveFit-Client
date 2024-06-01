import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const AllNewsLetter = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newsLetter = [], refetch } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/newsletter");
      return data;
    },
  });
//   console.log(newsLetter);
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-Bebas font-bold text-center text-gray-800">
        All Newsletter Subscriber
      </h1>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Serial
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {newsLetter.map((news, index) => (
              <tr key={news._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {news.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {news.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNewsLetter;
