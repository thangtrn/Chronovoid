import React, { useEffect, useState } from "react";
import { formatDate, formatPrice } from "../utils/format";
import { Input, Space, Table } from "antd";
import axiosInstance from "../axios/axiosInstance";

const InventoryDetailPage = () => {
   const [dataInventory, setDataInventory] = useState([]);
   const [searchInventory, setSearchInventory] = useState("");

   const fetchTableDataInventory = async () => {
      try {
         const res = await axiosInstance.get("/inventories");
         setDataInventory(res?.data?.metadata);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchTableDataInventory();
   }, []);

   const columnsInventory = [
      {
         title: "Mã phiếu nhập",
         dataIndex: "_id",
         filteredValue: [searchInventory],
         onFilter: (value, record) => {
            return String(record?._id)
               .toLowerCase()
               .includes(value.toLowerCase());
         },
      },
      {
         title: "Mã sản phẩm",
         dataIndex: "product",
         render: (item) => item?._id,
      },
      {
         title: "Tên sản phẩm",
         dataIndex: "product",
         render: (item) => item?.name,
      },
      {
         title: "Số lượng",
         dataIndex: "quantity",
      },
      {
         title: "Tiền nhập hàng",
         dataIndex: "totalPrice",
         render: (item) => formatPrice(item),
      },
      {
         title: "Ngày nhập",
         dataIndex: "createdAt",
         render: (item) => formatDate(item),
      },
   ];
   return (
      <div>
         <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Phiếu nhập hàng</h3>
            <Input.Search
               style={{
                  width: "300px",
               }}
               onSearch={(value) => {
                  console.log("---->", value);
                  setSearchInventory(value);
               }}
               allowClear
               placeholder="Tên phiếu nhập"
            />
         </Space>

         <div className="table-wrapper">
            <Table
               pagination={{ pageSize: 5 }}
               size="small"
               rowKey="_id"
               scroll={{ x: 800 }}
               columns={columnsInventory}
               dataSource={dataInventory}
            />
         </div>
      </div>
   );
};

export default InventoryDetailPage;
