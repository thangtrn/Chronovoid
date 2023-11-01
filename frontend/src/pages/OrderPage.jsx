import { Button, Space, Table } from 'antd'
import React from 'react'

const OrderPage = () => {

   const orders = []

   const parentColumns = [
      {
         title: 'Mã hoá đơn',
         dataIndex: 'id',
         render: (text) => (
            <div>
               <span className='font-medium'>Mã hoá đơn:</span> {text}
            </div>
         )
      },
      {
         title: 'Ngày hoá đơn',
         dataIndex: 'createDate',
         render: (text) => (
            <div>
               <span className='font-medium'>Ngày mua:</span>
               {/* {formatDate(text)} */}
            </div>
         )
      },
      {
         title: 'Tổng tiền',
         dataIndex: 'totalAmount',
         render: (text) => (
            <div>
               <span className='font-medium'>Tổng tiền:</span>
               {/* {formatPrice(text)} */}
            </div>
         )
      },
   ]

   const expandedRowRender = (record) => {
      const columns = [
         {
            title: 'Tên sản phẩm',
            dataIndex: 'product',
            render: (_, record) => (
               <div className='flex gap-[10px]'>
                  <div className='w-16 h-16 flex-shrink-0'>
                     <img
                        className='w-full h-full object-cover'
                        src={record?.productImage}
                        alt=''
                     />
                  </div>
                  <p className='text-truncate-2'>{record?.productName}</p>
               </div>
            ),
            width: '40%'
         },
         {
            title: 'Đơn giá',
            dataIndex: 'price',
            // render: (text) => formatPrice(text)
         },
         {
            title: 'Số lượng',
            dataIndex: 'quantity',
         },
         {
            title: 'Thành tiền',
            // render: (_, record) => formatPrice(record?.quantity * record?.price)
         },
      ];

      return (
         <Table
            columns={columns}
            rowKey="productId"
            dataSource={record.orderItems}
            pagination={false}
            size="small"
         />
      );
   };

   return (
      <div>
         <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Danh sách mua hàng</h2>
            <button>1</button>
         </Space>
         <div className='table-wrapper'>
            <Table
               size="small"
               pagination={false}
               // showHeader={false}
               columns={parentColumns}
               rowKey="id"
               dataSource={orders}
               expandable={{
                  expandedRowRender,
                  expandedRowKeys: orders.map(item => item?.id)
               }}
            />
         </div>
      </div>
   )
}

export default OrderPage