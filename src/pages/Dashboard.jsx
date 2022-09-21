import { FcOk } from "react-icons/fc";

import { todayStats, leaveBreakdown } from "../data/db";
import { useAuthContext } from "../context/auth-context";

const Dashboard = () => {
  const { userName, today, userEmail } = useAuthContext();
  console.log(userName);
  return (
    <div className="mt-12">
      {/* detail box */}
      <div className="md:w-400 border-1 border-orange-200 bg-slate-300 rounded-2xl p-6 m-3">
        <p className="text-xl font-semibold">Your Details</p>
        <p className="text-sm p-2 m-2">Email: {userEmail} </p>
        <p className="text-sm p-2 m-2">User Name: {userName} </p>
        <p className="text-sm p-2 m-2">
          Today: {today.yy}:{today.mm}:{today.dd}{" "}
        </p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        {/* ///////////////DATA BOX 1///START///////prototype data//////////////////*/}
        <div className="md:w-400 bg-white rounded-2xl p-6 m-3">
          <p className="text-xl font-semibold">Today</p>
          <div className="mt-5 ">
            {todayStats.map((item) => (
              <div
                key={item.title}
                className="flex justify-between bg-blue-200 mt-0.5 w-50%"
              >
                <div className="flex gap-4 ">
                  <button type="button">{item.icon}</button>
                  <div>
                    <p className="text-gray-500 ">{item.title}</p>
                  </div>
                </div>
                <span className="flex justify-center  mr-3">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        {/* ///////////////DATA BOX 1/END//////////////////////////////*/}
        {/* ///////////////DATA BOX 2///START///////prototype data////////////////*/}
        <div className="md:w-400 bg-white rounded-2xl p-6 m-3">
          <p className="text-xl ">Leave Breakdown this month</p>
          <div className="mt-5 ">
            {leaveBreakdown.map((item) => (
              <div
                key={item.title}
                className="flex justify-between mt-0.5 w-50%"
              >
                <div className="flex gap-4 ">
                  <button type="button">{<FcOk />}</button>
                  <div>
                    <p className="text-gray-500 ">{item.title}</p>
                  </div>
                </div>
                <span className="flex justify-center text-sm mr-3">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* ///////////////DATA BOX 2/END//////////////////////////////*/}
      </div>
    </div>
  );
};

export default Dashboard;
