import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, message } from 'antd'
import axiosInstance from '../../axios/axiosInstance'

const CreateModal = ({ reload, onClose }) => {
   const [categoriesData, setCategoriesData] = useState([])

   const handleSubmit = async (values) => {
      try {
         console.log(values);
         await axiosInstance.post('/products', { ...values })
         message.success('Thêm thành công')
         reload()
         onClose()
      } catch (error) {
         console.log(error);
         message.error(error?.response?.data?.message)
      }
   }

   const fetchCategoryData = async () => {
      try {
         const res = await axiosInstance.get('/categories')
         setCategoriesData(res?.data?.metadata)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchCategoryData()
   }, [])

   return (
      <div className='modal-wrapper'>
         <Form
            name="basic"
            labelCol={{
               span: 4,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
         >
            <Form.Item
               label="Tên sản phẩm"
               name="name"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập tên sản phẩm',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Hình ảnh"
               name="image"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập tên sản phẩm',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Giá sản phẩm"
               name="price"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập giá của sản phẩm',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Số lượng"
               name="quantity"
               initialValue={0}
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập số lượng',
                  },
               ]}
            >
               <Input disabled />
            </Form.Item>

            <Form.Item
               label="Danh mục"
               name="categoryId"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập số lượng',
                  },
               ]}
            >
               <Select
                  options={categoriesData.map(item => ({
                     value: item?._id,
                     label: item?._id + ' - ' + item?.name
                  }))}
               />
            </Form.Item>

            <Form.Item
               label="Mô tả"
               name="description"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập mô tả',
                  },
               ]}
            >
               <Input.TextArea />
            </Form.Item>
            <Form.Item className='modal-footer'>
               <Button type="primary" htmlType="submit">
                  Thêm mới
               </Button>
            </Form.Item>
         </Form>
      </div >
   )
}

export default CreateModal