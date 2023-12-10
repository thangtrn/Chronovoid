import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import axiosInstance from "../axios/axiosInstance";

import { ShoppingCartOutlined } from "@ant-design/icons";
import DashboardCard from "../components/Dashboard/DashboardCard";
import { BarChart, LineChart } from "../components/Chart";
import moment from "moment";

const DashboardPage = () => {
   // chart Data
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

         const res = await axiosInstance.get("/statistic/revenue", {
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
                  label: "Doanh thu",
                  data: data.map((item) => item?.totalPrice),
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

   // data
   const [data, setData] = useState([]);
   const fetchDashboard = async () => {
      try {
         const res = await axiosInstance.get("/statistic/dashboard");
         setData(res?.data?.metadata);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      fetchDashboard();
   }, []);

   return (
      <div>
         <Row gutter={[16, 16]}>
            {data?.map((item, index) => (
               <DashboardCard
                  key={index}
                  title={item?.title}
                  value={item?.value}
                  prefix={
                     <ShoppingCartOutlined
                        size={24}
                        style={{ marginRight: "18px" }}
                     />
                  }
                  suffix={item?.suffix}
               />
            ))}
         </Row>

         <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
               <BarChart data={chartData} title="Doanh thu trong tuần" />
            </Col>
            <Col span={12}>
               <LineChart title="Đơn bán hàng trong tuần" />
            </Col>
         </Row>
      </div>
   );
};

export default DashboardPage;
