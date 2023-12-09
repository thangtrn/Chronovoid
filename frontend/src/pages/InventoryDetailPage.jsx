import { Button, DatePicker, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatDate, formatPrice } from "../utils/format";

const InventoryDetailPage = () => {
   const [inventories, setInventories] = useState([]);
   const [search, setSearch] = useState("");
   const [selectedDate, setSelectedDate] = useState(null);

   const fetchDataTable = async () => {
      try {
         const res = await axiosInstance.get("/inventories");

         setInventories(res?.data?.metadata);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchDataTable();
   }, []);

   const onChange = (date, dateString) => {
      setSelectedDate(date);
   };

   const parentColumns = [
      {
         title: "Mã hoá đơn",
         dataIndex: "_id",
         render: (item) => (
            <div>
               <b>Mã hoá đơn:</b> {item}
            </div>
         ),
         filteredValue: [search],
         onFilter: (value, record) => {
            return String(record?._id)
               .toLowerCase()
               .includes(value.toLowerCase());
         },
      },
      {
         title: "Nhân viên",
         dataIndex: "staff",
         render: (item) => (
            <div>
               <b>Nhân viên:</b> {item?._id} - {item?.name}
            </div>
         ),
      },
      {
         title: "Ngày hoá đơn",
         dataIndex: "createdAt",
         render: (text) => (
            <div>
               <b>Ngày mua: </b>
               {formatDate(text)}
            </div>
         ),
         filteredValue: [selectedDate],
         onFilter: (value, record) => {
            if (!selectedDate) return true; // Không có ngày được chọn, hiển thị tất cả
            const d1 = new Date(value);
            const d2 = new Date(record?.createdAt);

            console.log(d1.getMonth(), d2.getMonth());
            return (
               d1.getMonth() === d2.getMonth() &&
               d1.getFullYear() === d2.getFullYear()
            );
         },
      },
      {
         title: "Tổng tiền",
         dataIndex: "totalPrice",
         render: (item) => (
            <div>
               <b>Tổng tiền: </b>
               {formatPrice(item)}
            </div>
         ),
      },
   ];

   const expandedRowRender = (record) => {
      const columns = [
         {
            title: "Tên sản phẩm",
            dataIndex: "product",
            render: (item, record) => (
               <div className="fy-center">
                  <img className="table-image" src={item?.image} alt="" />
                  <p className="text-truncate-2">{item?.name}</p>
               </div>
            ),
            width: "40%",
         },
         {
            title: "Đơn giá",
            dataIndex: "price",
            render: (item) => formatPrice(item),
         },
         {
            title: "Số lượng",
            dataIndex: "quantity",
         },
         {
            title: "Thành tiền",
            render: (_, record) =>
               formatPrice(record?.quantity * record?.price),
         },
      ];

      return (
         <Table
            columns={columns}
            rowKey="_id"
            dataSource={record?.inventoryItems}
            pagination={false}
            size="small"
         />
      );
   };

   return (
      <div>
         <Space
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h2>Phiếu nhập hàng</h2>
            <div>
               <DatePicker
                  onChange={onChange}
                  picker="month"
                  style={{ marginRight: "10px" }}
                  placeholder="Chọn tháng"
               />
               <Input.Search
                  style={{
                     width: "300px",
                  }}
                  onSearch={(value) => {
                     console.log("---->", value);
                     setSearch(value);
                  }}
                  allowClear
                  placeholder="Nhập mã phiếu nhập"
               />
            </div>
         </Space>
         <div className="table-wrapper">
            <Table
               size="small"
               pagination={false}
               showHeader={false}
               columns={parentColumns}
               rowKey="_id"
               dataSource={inventories}
               expandable={{
                  expandedRowRender,
                  expandedRowKeys: inventories.map((item) => item?._id),
               }}
            />
         </div>
      </div>
   );
};

export default InventoryDetailPage;
