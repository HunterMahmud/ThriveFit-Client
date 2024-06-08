import React, { PureComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { Helmet } from 'react-helmet-async';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Balance = () => {
  const axiosSecure = useAxiosSecure();
  const { data: financialData, isLoading: isFinancialLoading } = useQuery({
    queryKey: ["financialData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/balance-transactions");
      return data;
    },
  });

  const { data: memberData, isLoading: isMemberLoading } = useQuery({
    queryKey: ["memberData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/unique-emails");
      return data;
    },
  });

  if (isFinancialLoading || isMemberLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
           <Helmet>
        <title>ThriveFit | Loading Financial Overview</title>
      </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { totalBalance, transactions } = financialData;
  const { totalPaidUser, totalNewsLetterSubscriber } = memberData;

  const data = [
    { name: "Paid User", value: totalPaidUser },
    { name: "Total NewsLetter Subscriber", value: totalNewsLetterSubscriber },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="hanging"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full mx-auto p-4">
      <Helmet>
        <title>ThriveFit | Financial Overview</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Financial Overview
      </h1>

      <div className="flex flex-col lg:flex-row justify-around items-center mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full lg:w-1/3">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Total Balance
          </h2>
          <p className="text-3xl text-green-600">${totalBalance}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full lg:w-1/3">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Recent Transactions
          </h2>
          <ul className="text-gray-700">
            {transactions.slice(0, 6).map((transaction, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>
                  {index + 1}. {transaction.username}
                </span>
                <span>
                  {" "}
                  {new Date(transaction.orderDate).toLocaleDateString()}{" "}
                  {new Date(transaction.orderDate).toLocaleTimeString()}
                </span>
                <span className="text-green-600">${transaction.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white border shadow-lg rounded-lg p-6  w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Subscribers vs Paid Members
        </h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: "40px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Balance;
