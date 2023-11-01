import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Select, message } from 'antd'
import axiosInstance from '../../axios/axiosInstance'

const EditModal = ({ reload, onClose, data }) => {
   const [isEditPassword, setIsEditPassword] = useState(false);

   const handleSubmit = async (values) => {
      try {
         console.log('D', values);
         await axiosInstance.put('/auth/users', { userId: data?._id, ...values })
         message.success('Cập nhật thành công')
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
               initialValue={data?.name}
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
               label="Hình ảnh"
               name="image"
               initialValue={data?.image}
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập hình ảnh',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Email"
               name="email"
               initialValue={data?.email}
            >
               <Input disabled />
            </Form.Item>

            <Form.Item
               label="Quyền"
               name="role"
               initialValue={data?.role}
            >
               <Select
                  options={[
                     {
                        label: 'Nhân viên',
                        value: 'staff'
                     },
                     {
                        label: 'Quản lý',
                        value: 'admin'
                     },
                  ]}
               />
            </Form.Item>

            <Form.Item label="Sửa mật khẩu">
               <Checkbox onChange={value => setIsEditPassword(value)} />
            </Form.Item>


            {
               isEditPassword && (
                  <Form.Item
                     label="Mật khẩu"
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập mật khẩu',
                        },
                     ]}
                  >
                     <Input.Password />
                  </Form.Item>
               )
            }

            <Form.Item className='modal-footer'>
               <Button type="primary" htmlType="submit">
                  Cập nhật
               </Button>
            </Form.Item>
         </Form>
      </div >
   )
}

export default EditModal