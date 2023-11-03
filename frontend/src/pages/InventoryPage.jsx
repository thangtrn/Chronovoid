import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, message } from 'antd'
import axiosInstance from '../axios/axiosInstance'
import {
   RedoOutlined
} from '@ant-design/icons';

const InventoryPage = () => {
   const [form] = Form.useForm();
   const [dataProduct, setDataProduct] = useState([])
   const [dataSelectedProduct, setDataSelectedProduct] = useState(null)
   const [searchProduct, setSearchProduct] = useState("");

   const [dataInventory, setDataInventory] = useState([])
   const [searchInventory, setSearchInventory] = useState("");

   const [totalPrice, setTotalPrice] = useState(0)


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
      },
      {
         title: 'Tên sản phẩm',
         dataIndex: 'name',
         filteredValue: [searchProduct],
         onFilter: (value, record) => {
            return String(record?.name).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Giá',
         dataIndex: 'price',
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
         title: 'Mô tả',
         dataIndex: 'description',
      },
   ]

   const columnsInventory = [
      {
         title: 'Mã phiếu nhập',
         dataIndex: '_id',
         filteredValue: [searchInventory],
         onFilter: (value, record) => {
            return String(record?._id).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Mã sản phẩm',
         dataIndex: 'product',
         render: (item) => item?._id
      },
      {
         title: 'Tên sản phẩm',
         dataIndex: 'product',
         render: (item) => item?.name
      },
      {
         title: 'Số lượng',
         dataIndex: 'quantity'
      },
      {
         title: 'Tiền nhập hàng',
         dataIndex: 'totalPrice',
      },
   ]

   const fetchTableDataProduct = async () => {
      try {
         const res = await axiosInstance.get('/products')
         setDataProduct(res?.data?.metadata)
      } catch (error) {
         console.log(error);
      }
   }

   const fetchTableDataInventory = async () => {
      try {
         const res = await axiosInstance.get('/inventories')
         setDataInventory(res?.data?.metadata)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchTableDataProduct()
      fetchTableDataInventory()
   }, [])

   const handleUncheckRadioProduct = () => {
      setDataSelectedProduct(null)
      fetchTableDataProduct()
      message.success('Làm mới thành công')
      form.resetFields();
      setTotalPrice(0)
   };

   const handleSubmitInventory = async ({ _id, quantity, totalPrice }) => {
      try {
         await axiosInstance.post('/inventories', {
            productId: _id,
            totalPrice,
            quantity
         })
         fetchTableDataProduct()
         fetchTableDataInventory()
         form.resetFields();
         setTotalPrice(0)
         setDataSelectedProduct(null)
         message.success('Tạo phiếu nhập thành công')
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
                  placeholder="Tên sản phẩm"
               />
            </Space>

            <div className='table-wrapper'>
               <Table
                  pagination={{ pageSize: 5 }}
                  size='small'
                  rowKey='_id'
                  scroll={{ x: 800 }}
                  columns={columnsProduct}
                  dataSource={dataProduct}
                  rowSelection={{
                     type: 'radio',
                     columnTitle: () => {
                        return (
                           <Tooltip title="Làm mới">
                              <RedoOutlined
                                 className="icon-reset-rad-btn"
                                 onClick={handleUncheckRadioProduct}
                              />
                           </Tooltip>
                        );
                     },
                     onChange: (_, selectedRows) => {
                        setDataSelectedProduct(selectedRows[0]);
                     },
                     selectedRowKeys: dataSelectedProduct ? [dataSelectedProduct._id] : [],
                  }}
               />
            </div>

            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
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

            <div className='table-wrapper'>
               <Table
                  pagination={{ pageSize: 5 }}
                  size='small'
                  rowKey='_id'
                  scroll={{ x: 800 }}
                  columns={columnsInventory}
                  dataSource={dataInventory}
               />
            </div>
         </div>

         <div className='inventory-right'>
            <h2>Nhập hàng</h2>
            <Form
               form={form}
               onFinish={handleSubmitInventory}
               layout='vertical'
               fields={[
                  { name: '_id', value: dataSelectedProduct?._id },
                  { name: 'name', value: dataSelectedProduct?.name },
                  { name: 'totalPrice', value: totalPrice },
               ]}
               style={{
                  border: '1px solid #eee',
                  padding: '10px',
                  borderRadius: '8px'
               }}
            >
               <Form.Item label='Mã sản phẩm' name='_id'>
                  <Input readOnly />
               </Form.Item>
               <Form.Item label='Tên sản phẩm sản phẩm' name='name'>
                  <Input readOnly />
               </Form.Item>
               <Form.Item
                  label='Số lượng'
                  name='quantity'
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập số lượng',
                     },
                  ]}
               >
                  <InputNumber
                     style={{ width: '100%' }}
                     onChange={(value) => setTotalPrice(value * dataSelectedProduct?.price)}
                     readOnly={dataSelectedProduct === null}
                     min={1}
                  />
               </Form.Item>
               <Form.Item
                  label='Tổng tiền'
                  name='totalPrice'
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập tên danh mục',
                     },
                  ]}
               >
                  <InputNumber
                     style={{ width: '100%' }}
                     readOnly
                  />
               </Form.Item>
               <Form.Item>
                  <Button
                     htmlType='submit'
                     type='primary'
                     style={{ width: '100%' }}
                     disabled={dataSelectedProduct === null}
                  >
                     Nhập hàng
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   )
}

export default InventoryPage