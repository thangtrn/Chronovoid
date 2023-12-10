import React, { useEffect, useState } from "react";
import { BarChart, LineChart } from "../components/Chart";
import axiosInstance from "../axios/axiosInstance";
import moment from "moment";
import DashboardCard from "../components/Dashboard/DashboardCard";

import { DollarOutlined } from "@ant-design/icons";
import { Row, DatePicker } from "antd";
import dayjs from "dayjs";

const StatisticsPage = () => {
   const [values, setValues] = useState({
      revenue: 0,
      expense: 0,
      profit: 0,
   });
   // chart Data
   const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
   });

   const startOfWeek = moment().clone().startOf("isoWeek");

   // Lấy ngày cuối tuần (thường là Chủ Nhật)
   const endOfWeek = moment().clone().endOf("isoWeek");

   const fetchChart = async (fromDate, toDate) => {
      try {
         // Lấy ngày đầu tuần (thường là thứ 2)
         const res = await axiosInstance.get("/statistic", {
            params: {
               fromDate: fromDate || startOfWeek,
               toDate: toDate || endOfWeek,
            },
         });

         const data = res?.data?.metadata || [];
         console.log(data);

         const revenue = data?.reduce(
            (curr, item) => curr + item?.amountOrder,
            0
         );
         const expense = data?.reduce(
            (curr, item) => curr + item?.amountInventory,
            0
         );

         setValues({
            revenue: revenue,
            expense: expense,
            profit: revenue - expense,
         });
         setChartData({
            labels: data.map((item) => item?.date),
            datasets: [
               {
                  label: "Doanh thu",
                  data: data.map((item) => item?.amountOrder),
                  backgroundColor: "#36a2eb",
               },
               {
                  label: "Chi phí",
                  data: data.map((item) => item?.amountInventory),
                  backgroundColor: "#ff6384",
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

   const handleRangePickerChange = (dates, dateStrings) => {
      const fromDate = dates[0].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const toDate = dates[1].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      console.log("Run", fromDate, toDate);
      fetchChart(fromDate, toDate);
   };

   const dateFormat = "DD-MM-YYYY";

   return (
      <div>
         <div className="statistic-date">
            <DatePicker.RangePicker
               defaultValue={[dayjs(startOfWeek), dayjs(endOfWeek)]}
               onChange={handleRangePickerChange}
               format={dateFormat}
               allowClear={false}
            />
         </div>
         <Row gutter={[16, 16]}>
            <DashboardCard
               title={"Tổng doanh thu"}
               value={values?.revenue}
               prefix={
                  <DollarOutlined size={24} style={{ marginRight: "18px" }} />
               }
               suffix={"đ"}
            />
            <DashboardCard
               title={"Tổng chi phí"}
               value={values?.expense}
               prefix={
                  <DollarOutlined size={24} style={{ marginRight: "18px" }} />
               }
               suffix={"đ"}
            />
            <DashboardCard
               title={"Lợi nhuận"}
               value={values?.profit}
               prefix={
                  <DollarOutlined size={24} style={{ marginRight: "18px" }} />
               }
               suffix={"đ"}
            />
         </Row>
         <div style={{ marginTop: 16 }}>
            <BarChart data={chartData} title="Thống kê" />
         </div>
      </div>
   );
};

export default StatisticsPage;
