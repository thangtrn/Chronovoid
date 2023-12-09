import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, title = "Hello" }) => {
   return (
      <div className="chart-wrapper">
         <Bar
            data={data}
            options={{
               plugins: {
                  title: {
                     display: true,
                     text: title,
                  },
                  legend: {
                     display: false,
                  },
               },
            }}
         />
      </div>
   );
};

export default BarChart;
