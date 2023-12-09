import React, { useState } from "react";
import { Col, Row } from "antd";
import {
   ShoppingCartOutlined,
   DollarOutlined,
   OrderedListOutlined,
} from "@ant-design/icons";
import DashboardCard from "../components/Dashboard/DashboardCard";
import { BarChart, LineChart } from "../components/Chart";

const Data = [
   {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
   },
   {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
   },
   {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
   },
   {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
   },
   {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
   },
];

const DashboardPage = () => {
   const [chartData, setChartData] = useState({
      labels: Data.map((data) => data.year),
      datasets: [
         {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
         },
      ],
   });

   return (
      <div>
         <Row gutter={[16, 16]}>
            <DashboardCard
               title="Đơn hàng trong ngày"
               value={11}
               prefix={
                  <ShoppingCartOutlined
                     size={24}
                     style={{ marginRight: "18px" }}
                  />
               }
            />
            <DashboardCard
               title="Doanh thu trong ngày"
               value={11}
               prefix={
                  <DollarOutlined size={24} style={{ marginRight: "18px" }} />
               }
            />
            <DashboardCard
               title="Phiếu nhập trong ngày"
               value={11}
               prefix={
                  <OrderedListOutlined
                     size={24}
                     style={{ marginRight: "18px" }}
                  />
               }
            />
            <DashboardCard
               title="Tiền hàng trong ngày"
               value={11}
               prefix={
                  <DollarOutlined size={24} style={{ marginRight: "18px" }} />
               }
            />
         </Row>

         <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
               <BarChart data={chartData} />
            </Col>
            <Col span={12}>
               <LineChart />
            </Col>
         </Row>
      </div>
   );
};

export default DashboardPage;
