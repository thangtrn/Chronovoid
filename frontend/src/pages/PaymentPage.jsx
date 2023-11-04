import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, message } from 'antd'
import axiosInstance from '../axios/axiosInstance'
import {
   DeleteOutlined,
   MinusOutlined,
   PlusOutlined
} from '@ant-design/icons';
import { formatDate, formatPrice, totalPrice } from '../utils/format';
import { AppContext } from '../context/AppProvider';

const PaymentPage = () => {
   const { auth } = useContext(AppContext);

   const [form] = Form.useForm();
   const [dataProduct, setDataProduct] = useState([])
   const [searchProduct, setSearchProduct] = useState("");

   const [dataCart, setDataCart] = useState([]);

   const columnsProduct = [
      {
         title: 'Hình ảnh',
         dataIndex: 'image',
         width: '80px',
         render: (text) => {
            return (
               <img className='table-image' src={text} alt='' />
            )
         }
      },
      {
         title: 'Mã sản phẩm',
         dataIndex: '_id',
         filteredValue: [searchProduct],
         onFilter: (value, record) => {
            return String(record?._id).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Tên sản phẩm',
         dataIndex: 'name',
      },
      {
         title: 'Giá',
         dataIndex: 'price',
         render: (item) => formatPrice(item)
      },
      {
         title: 'Số lượng',
         dataIndex: 'quantity'
      },
      {
         title: 'Danh mục',
         dataIndex: 'category',
         render: (item) => item?.name
      },
      {
         title: '',
         render: (_, record) => {
            let recordD = { ...record, totalProduct: record.quantity }
            return (
               <Tooltip title="Thêm">
                  <Button
                     icon={<PlusOutlined />}
                     type='primary'
                     size='small'
                     onClick={() => handleAddCart(recordD)}
                  />
               </Tooltip>
            )
         }
      }
   ]

   const columnsInventory = [
      {
         title: 'Hình ảnh',
         dataIndex: 'image',
         width: '80px',
         render: (text) => {
            return (
               <img className='table-image' src={text} alt='' />
            )
         }
      },
      {
         title: 'Mã sản phẩm',
         dataIndex: '_id',
         // filteredValue: [searchProduct],
         // onFilter: (value, record) => {
         //    return String(record?._id).toLowerCase().includes(value.toLowerCase());
         // },
      },
      {
         title: 'Tên sản phẩm',
         dataIndex: 'name',
      },
      {
         title: 'Giá',
         dataIndex: 'price',
         render: (item) => formatPrice(item)
      },
      {
         title: 'Số lượng',
         dataIndex: 'quantity',
         width: '160px',
         render: (_, record) => {
            return (
               <>
                  <Button icon={<MinusOutlined />} size='small' onClick={() => handleSetQuantity('minus', record)} />
                  <InputNumber size='small' value={record?.quantity} min={1} readOnly />
                  <Button icon={<PlusOutlined />} size='small' onClick={() => handleSetQuantity('plus', record)} />
               </>
            )
         }
      },
      {
         title: 'Danh mục',
         dataIndex: 'category',
         render: (item) => item?.name
      },
      {
         title: '',
         render: (_, record) => {
            return (
               <Tooltip title="Xoá">
                  <Button
                     icon={<DeleteOutlined />}
                     danger
                     type='primary'
                     size='small'
                     onClick={() => handleRemoveItemCart(record)}
                  />
               </Tooltip>
            )
         }
      },
   ]

   const handleAddCart = (record) => {
      if (record.quantity <= 0) {
         return message.warning('Sản phẩm đã hết hàng')
      }
      const index = dataCart.findIndex(item => item._id === record._id);
      if (index < 0) {
         record.quantity = 1;
         setDataCart([...dataCart, record])
      }
      else {
         if (record.quantity <= dataCart[index].quantity) {
            return message.warning('Hàng trong kho không đủ')
         }

         dataCart[index].quantity += 1
         const newDataCart = dataCart.map((item, idx) => {
            if (idx === item)
               return item.quantity += 1
            else
               return item
         })

         setDataCart(newDataCart)
      }
   }

   const handleRemoveItemCart = (record) => {
      console.log(record);
      const newData = dataCart.filter(item => item._id !== record._id)
      setDataCart(newData);
   }

   const handleSetQuantity = (type, record) => {
      let newDataCart
      if (type === 'minus') {
         if (record.quantity <= 1)
            return;
         newDataCart = dataCart.map((item) => {
            if (item._id === record._id)
               item.quantity -= 1
            return item
         })

      }
      else {
         if (record.quantity >= record?.totalProduct)
            return;
         newDataCart = dataCart.map((item) => {
            if (item._id === record._id)
               item.quantity += 1
            return item
         })
      }
      setDataCart(newDataCart)

   }

   // LOAD DATA
   const fetchTableDataProduct = async () => {
      try {
         const res = await axiosInstance.get('/products')
         setDataProduct(res?.data?.metadata)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchTableDataProduct()
   }, [])


   const handleSubmitOrder = async () => {
      try {
         let products = []
         dataCart.forEach(item => {
            products.push({
               productId: item?._id,
               quantity: item?.quantity,
               price: item?.price
            })
         })

         console.log(products);

         await axiosInstance.post('/orders', {
            totalPrice: totalPrice(dataCart),
            userId: auth?._id,
            products: products
         })
         fetchTableDataProduct();
         setDataCart([])
         message.success('Thanh toán thành công')
      } catch (error) {
         console.log(error);
         message.error('Đã có lỗi')
      }
   }

   return (
      <div className='inventory-wrapper'>
         <div className='inventory-left'>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
               <h3>Sản phẩm</h3>
               <Input.Search
                  style={{
                     width: "300px",
                  }}
                  onSearch={(value) => {
                     console.log("---->", value);
                     setSearchProduct(value);
                  }}
                  allowClear
                  placeholder="Nhập mã sản phẩm"
               />
            </Space>

            <div className='table-wrapper'>
               <Table
                  size='small'
                  rowKey='_id'
                  scroll={{ x: 800 }}
                  columns={columnsProduct}
                  dataSource={dataProduct}
               />
            </div>

            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
               <h3>Giỏ hàng</h3>
            </Space>

            <div className='table-wrapper'>
               <Table
                  size='small'
                  rowKey='_id'
                  scroll={{ x: 800 }}
                  columns={columnsInventory}
                  dataSource={dataCart}
               />
            </div>
         </div>

         <div className='inventory-right'>
            <h2>Hoá đơn</h2>
            <Form
               form={form}
               onFinish={handleSubmitOrder}
               layout='vertical'
               style={{
                  border: '1px solid #eee',
                  padding: '14px 10px',
                  borderRadius: '8px'
               }}
            >
               <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3>Ngày hoá đơn</h3>
                  <span>{formatDate(new Date())}</span>
               </Space>
               <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3>Tổng tiền</h3>
                  <b>{formatPrice(totalPrice(dataCart))}</b>
               </Space>
               <Button htmlType='submit' type='primary' style={{ width: '100%' }} disabled={dataCart.length <= 0}>Thanh toán</Button>
            </Form>
         </div>
      </div>
   )
}

export default PaymentPage