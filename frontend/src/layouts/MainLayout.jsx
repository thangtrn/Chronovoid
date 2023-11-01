import React, { useState } from 'react';
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   OrderedListOutlined,
   UserOutlined,
   DropboxOutlined,
   CreditCardOutlined,
   PayCircleOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   const handleChangePage = ({ _, key }) => {
      navigate(key)
   }

   return (
      <Layout>
         <Sider trigger={null} theme='light' collapsible collapsed={collapsed} className='min-h-screen'>
            <Link to='/' className='logo'>
               Tạp hoá
            </Link>
            <Menu
               mode="inline"
               defaultSelectedKeys={[location.pathname]}
               onClick={handleChangePage}
               defaultOpenKeys={['1', '2']}
               items={[
                  {
                     key: '1',
                     label: 'Mua bán',
                     icon: <PayCircleOutlined />,
                     children: [
                        {
                           key: '/payment',
                           label: 'Thanh toán',
                           icon: <PayCircleOutlined />
                        },
                     ]
                  },
                  {
                     key: '2',
                     label: 'Quản lý',
                     icon: <PayCircleOutlined />,
                     children: [
                        {
                           key: '/category',
                           label: 'Thể loại',
                           icon: <OrderedListOutlined />
                        },
                        {
                           key: '/product',
                           label: 'Sản phẩm',
                           icon: <DropboxOutlined />
                        },
                        {
                           key: '/inventory',
                           label: 'Nhập hàng',
                           icon: <CreditCardOutlined />
                        },
                        {
                           key: '/order',
                           label: 'Hoá đơn',
                           icon: <CreditCardOutlined />
                        },
                        {
                           key: '/user',
                           label: 'Nhân viên',
                           icon: <UserOutlined />
                        },
                     ]
                  },
               ]}
            />
         </Sider>

         <Layout>
            <Header
               style={{
                  padding: 0,
                  background: colorBgContainer,
               }}
            >
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: '16px',
                     width: 64,
                     height: 64,
                  }}
               />
            </Header>
            <Content
               style={{
                  margin: '10px',
                  padding: 12,
                  border: '6px',
                  background: colorBgContainer,
               }}
            >

               <Outlet />

            </Content>
         </Layout>
      </Layout>
   );
};
export default MainLayout;