import React from "react";
import { FaDollarSign, FaBookmark, FaChartLine, FaUser } from "react-icons/fa";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="overview">
        <div className="ov-one">
          <div>
            <p>Revenue</p>
            <h1>$34k</h1>
          </div>
          <p className="dash-icon">
            <FaDollarSign />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Orders</p>
            <h1>811</h1>
          </div>
          <p className="dash-icon">
            <FaBookmark />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Profit</p>
            <h1>$2.3k</h1>
          </div>
            
          <p className="dash-icon">
            <FaChartLine />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Users</p>
            <h1>762</h1>
          </div>
            <p className="dash-icon">
            <FaUser />
          </p>
        </div>
      </div>
      <div className="transactions">
        <div className="earnings"></div>
        <div className="sales"></div>
        <div className="users"></div>
      </div>
    </div>
  );
}

export default Dashboard;
