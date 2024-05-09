import React from "react";
import "./Skeleton.css"; // Assuming styles are saved in this file

const SkeletonLoader = () => {
  return (
    <div className="dashboard">
      <div className="overview">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="ov-one" key={index}>
            <div>
              <div
                className="skeleton-box"
                style={{ width: "50%", marginBottom: "10px" }}
              ></div>
              <div className="skeleton-header"></div>
            </div>
            <div
              className="skeleton-box"
              style={{ width: "24px", height: "24px" }}
            ></div>
          </div>
        ))}
      </div>
      <div className="transactions">
        <div className="sales">
          <div className="skeleton-header"></div>
          <div className="skeleton-chart"></div>
        </div>
        <div className="earnings">
          <div className="skeleton-header"></div>
          <div className="skeleton-chart"></div>
        </div>
        <div className="users">
          <div className="skeleton-header"></div>
          <div className="skeleton-chart"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
