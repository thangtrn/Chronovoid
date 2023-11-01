import React from 'react'
import { Button, Form, Input, message } from 'antd'
import axiosInstance from '../../axios/axiosInstance'

const CreateModal = ({ reload, onClose }) => {
   const handleSubmit = async ({ name, description }) => {
      try {
         await axiosInstance.post('/categories', { name, description })
         message.success('Thêm thành công')
         reload()
         onClose()
      } catch (error) {
         console.log(error);
         message.error(error?.response?.data?.message)
      }
   }

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
               label="Tên danh mục"
               name="name"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập tên danh mục',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Mô tả"
               name="description"
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