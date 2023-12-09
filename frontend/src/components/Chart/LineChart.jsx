import React from "react";
import { Line } from "react-chartjs-2";

const data = {
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
   datasets: [
      {
         label: "First dataset",
         data: [33, 53, 85, 41, 44, 65],
      },
   ],
};

const options = {
   plugins: {
      title: {
         display: true,
         text: "Hello",
      },
      legend: {
         display: false,
      },
   },
   elements: { line: { tension: 0.4 } },
   fill: true,
   backgroundColor: "rgba(75,192,192,0.2)",
   borderColor: "rgba(75,192,192,1)",
};

const LineChart = ({ title = "Hello" }) => {
   return (
      <div className="chart-wrapper">
         <Line data={data} options={options} />
      </div>
   );
};

export default LineChart;
