import React from 'react'
import { Button, Form, Input, message } from 'antd'
import axiosInstance from '../../axios/axiosInstance'

const CreateModal = ({ reload, onClose }) => {
   const handleSubmit = async (values) => {
      try {
         await axiosInstance.post('/auth/register', { ...values })
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
               label="Họ tên"
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
               label="Email"
               name="email"
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Mật khẩu"
               name="password"
            >
               <Input.Password />
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