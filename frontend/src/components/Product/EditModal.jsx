import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, message } from 'antd'
import axiosInstance from '../../axios/axiosInstance'

const CreateModal = ({ reload, onClose, data }) => {
   const [categoriesData, setCategoriesData] = useState([])

   const handleSubmit = async (values) => {
      try {
         await axiosInstance.put('/products', { productId: data?._id, ...values })
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
               initialValue={data?.name}
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
               initialValue={data?.image}
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
               initialValue={data?.price}
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
               initialValue={data?.quantity}
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
               initialValue={data?.category?._id}
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn danh mục',
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
               initialValue={data?.description}
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
                  Cập nhật
               </Button>
            </Form.Item>
         </Form>
      </div >
   )
}

export default CreateModal