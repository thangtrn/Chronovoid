import { Card, Col, Statistic } from "antd";
import React from "react";

const DashboardCard = ({ title, value, prefix, suffix }) => {
   return (
      <Col span={6}>
         <Card
         // bordered={false}
         // style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
         >
            <Statistic
               title={title}
               value={value}
               prefix={prefix}
               suffix={suffix}
               valueStyle={{
                  color: "#3f8600",
               }}
            />
         </Card>
      </Col>
   );
};

export default DashboardCard;
