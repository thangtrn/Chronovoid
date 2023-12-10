import { Card, Col, Statistic } from "antd";
import React from "react";

const DashboardCard = ({ title, value, prefix, suffix, span = 6 }) => {
   return (
      <Col span={span}>
         <Card
            bordered={false}
            style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
         >
            <Statistic
               title={title}
               value={value}
               prefix={prefix}
               suffix={suffix}
               groupSeparator="."
               valueStyle={{
                  color: "#3f8600",
               }}
            />
         </Card>
      </Col>
   );
};

export default DashboardCard;
