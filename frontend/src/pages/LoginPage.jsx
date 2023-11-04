import React, { useContext, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import {
   UserOutlined,
   LockOutlined
} from '@ant-design/icons';
import { AppContext } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosInstance';

const LoginPage = () => {
   const { auth, setAuth } = useContext(AppContext)
   const navigate = useNavigate();

   const onFinish = async ({ email, password }) => {
      console.log('Received values of form: ', { email, password });
      try {
         const res = await axiosInstance.post('/auth/login', {
            email, password
         })
         console.log(res?.data?.metadata);
         setAuth(res?.data?.metadata);
         navigate('/');
         message.success('Đăng nhập thành công')
      } catch (error) {
         console.log(error);
         message.error('Tài khoản hoặc mật khẩu không đúng')
      }
   };

   useEffect(() => {
      if (auth) {
         navigate('/')
      }
   }, [auth, navigate])

   return (
      <div className='login-section'>
         <Form
            name="normal_login"
            className="login-form"
            initialValues={{
               remember: true,
            }}
            onFinish={onFinish}
         >
            <Form.Item>
               <h1>Đăng nhập</h1>
            </Form.Item>
            <Form.Item
               name="email"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập email!',
                  },
                  {
                     type: 'email',
                     message: 'Vui lòng nhập đúng định dạng email!',
                  }
               ]}
            >
               <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
               name="password"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập mật khẩu!',
                  },
               ]}
            >
               <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
               />
            </Form.Item>

            <Form.Item>
               <Button type="primary" htmlType="submit" className="login-form-button">
                  Đăng nhập
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default LoginPage