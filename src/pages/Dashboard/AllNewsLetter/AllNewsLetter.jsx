import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const AllNewsLetter = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newsLetter = [] } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/newsletter");
      return data;
    },
  });
  //   console.log(newsLetter);
  return (
    
      <div className="container p-2 mx-auto sm:p-4 text-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-center leading-tight">All Newsletter Subscriber</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />

              <col />
            </colgroup>
            <thead className="bg-gray-300">
              <tr className="text-center">
                <th className="p-3">Serial</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {newsLetter.map((news, index) => (
                <tr
                  key={news._id}
                  className="border-b text-center border-opacity-20 border-gray-300 bg-gray-100"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3">{news.name}</td>
                  <td className="p-3">{news.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
  );
};

export default AllNewsLetter;
