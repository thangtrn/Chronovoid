import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axiosInstance from "../../axios/axiosInstance";

const LineChart = ({ title = "Hello" }) => {
   const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
   });

   const fetchChart = async () => {
      try {
         // Lấy ngày đầu tuần (thường là thứ 2)
         const startOfWeek = moment().clone().startOf("isoWeek");

         // Lấy ngày cuối tuần (thường là Chủ Nhật)
         const endOfWeek = moment().clone().endOf("isoWeek");

         const res = await axiosInstance.get("/statistic/amount-order", {
            params: {
               fromDate: startOfWeek,
               toDate: endOfWeek,
            },
         });

         const data = res?.data?.metadata || [];
         setChartData({
            labels: data.map((item) => item?.date),
            datasets: [
               {
                  label: "Số đơn",
                  data: data.map((item) => item?.count),
               },
            ],
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchChart();
   }, []);
   return (
      <div className="chart-wrapper">
         <Line
            data={chartData}
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
               elements: { line: { tension: 0.4 } },
               fill: true,
               backgroundColor: "rgba(75,192,192,0.2)",
               borderColor: "rgba(75,192,192,1)",
               interaction: {
                  intersect: false,
               },
            }}
         />
      </div>
   );
};

export default LineChart;
