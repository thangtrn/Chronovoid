import { Button, Input, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axiosInstance'
import { formatDate, formatPrice } from '../utils/format'

const OrderPage = () => {
   const [orders, setOrders] = useState([])
   const [search, setSearch] = useState('')

   const fetchDataTable = async () => {
      try {
         const res = await axiosInstance.get('/orders');

         setOrders(res?.data?.metadata);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchDataTable();
   }, [])

   const parentColumns = [
      {
         title: 'Mã hoá đơn',
         dataIndex: '_id',
         render: (item) => (
            <div>
               <b>Mã hoá đơn:</b> {item}
            </div>
         ),
         filteredValue: [search],
         onFilter: (value, record) => {
            return String(record?._id).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Nhân viên',
         dataIndex: 'staff',
         render: (item) => (
            <div>
               <b>Nhân viên:</b> {item?._id} - {item?.name}
            </div>
         )
      },
      {
         title: 'Ngày hoá đơn',
         dataIndex: 'createdAt',
         render: (text) => (
            <div>
               <b>Ngày mua: </b>
               {formatDate(text)}
            </div>
         )
      },
      {
         title: 'Tổng tiền',
         dataIndex: 'totalPrice',
         render: (item) => (
            <div>
               <b>Tổng tiền: </b>
               {formatPrice(item)}
            </div>
         )
      },
   ]

   const expandedRowRender = (record) => {
      const columns = [
         {
            title: 'Tên sản phẩm',
            dataIndex: 'product',
            render: (item, record) => (
               <div className='fy-center'>
                  <img className='table-image' src={item?.image} alt='' />
                  <p className='text-truncate-2'>{item?.name}</p>
               </div>
            ),
            width: '40%'
         },
         {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (item) => formatPrice(item)
         },
         {
            title: 'Số lượng',
            dataIndex: 'quantity',
         },
         {
            title: 'Thành tiền',
            render: (_, record) => formatPrice(record?.quantity * record?.price)
         },
      ];

      return (
         <Table
            columns={columns}
            rowKey="_id"
            dataSource={record.orderItems}
            pagination={false}
            size="small"
         />
      );
   };

   return (
      <div>
         <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Hoá đơn mua hàng</h2>
            <Input.Search
               style={{
                  width: "300px",
               }}
               onSearch={(value) => {
                  console.log("---->", value);
                  setSearch(value);
               }}
               allowClear
               placeholder="Nhập mã hoá đơn"
            />
         </Space>
         <div className='table-wrapper'>
            <Table
               size="small"
               pagination={false}
               showHeader={false}
               columns={parentColumns}
               rowKey="_id"
               dataSource={orders}
               expandable={{
                  expandedRowRender,
                  expandedRowKeys: orders.map(item => item?._id)
               }}
            />
         </div>
      </div>
   )
}

export default OrderPage