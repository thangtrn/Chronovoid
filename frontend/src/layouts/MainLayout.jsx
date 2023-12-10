import React, { useContext, useEffect, useState } from "react";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   OrderedListOutlined,
   UserOutlined,
   DropboxOutlined,
   CreditCardOutlined,
   PayCircleOutlined,
   LoginOutlined,
   BarChartOutlined,
   HomeOutlined,
   ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
   const { auth, setAuth } = useContext(AppContext);

   const location = useLocation();
   const navigate = useNavigate();
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   const handleChangePage = ({ _, key }) => {
      navigate(key);
   };

   useEffect(() => {
      if (!auth) {
         navigate("/login");
      }
   }, [auth, navigate]);

   const items = [
      {
         key: "logout",
         label: "Đăng xuất",
         icon: <LoginOutlined />,
         onClick: () => {
            setAuth(null);
            message.success("Đăng xuất thành công");
         },
      },
   ];

   return (
      <Layout>
         <Sider
            trigger={null}
            theme="light"
            collapsible
            collapsed={collapsed}
            className="min-h-screen"
            width={230}
         >
            <Link to="/" className="logo">
               Tạp hoá
            </Link>
            <Menu
               mode="inline"
               defaultSelectedKeys={[location.pathname]}
               onClick={handleChangePage}
               defaultOpenKeys={["1", "2"]}
               items={[
                  {
                     key: "/",
                     label: "Dashboard",
                     icon: <HomeOutlined />,
                  },
                  {
                     key: "1",
                     label: "Mua bán",
                     icon: <PayCircleOutlined />,
                     children: [
                        {
                           key: "/payment",
                           label: "Thanh toán",
                           icon: <PayCircleOutlined />,
                        },
                     ],
                  },
                  {
                     key: "/category",
                     label: "Thể loại",
                     icon: <OrderedListOutlined />,
                     disabled: auth?.role !== "admin",
                  },
                  {
                     key: "/product",
                     label: "Sản phẩm",
                     icon: <DropboxOutlined />,
                     disabled: auth?.role !== "admin",
                  },
                  {
                     key: "2",
                     label: "Nhập hàng",
                     icon: <ProfileOutlined />,
                     children: [
                        {
                           key: "/inventory",
                           label: "Nhập hàng",
                           icon: <ProfileOutlined />,
                           disabled: auth?.role !== "admin",
                        },
                        {
                           key: "/inventory-detail",
                           label: "Phiếu nhập hàng",
                           icon: <ProfileOutlined />,
                           disabled: auth?.role !== "admin",
                        },
                     ],
                  },
                  {
                     key: "/order",
                     label: "Hoá đơn",
                     icon: <CreditCardOutlined />,
                     disabled: auth?.role !== "admin",
                  },
                  {
                     key: "/user",
                     label: "Nhân viên",
                     icon: <UserOutlined />,
                     disabled: auth?.role !== "admin",
                  },
                  {
                     key: "/statistic",
                     label: "Thống kê",
                     icon: <BarChartOutlined />,
                     disabled: auth?.role !== "admin",
                  },
               ]}
            />
         </Sider>

         <Layout>
            <Header
               style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "40px",
               }}
            >
               <Button
                  type="text"
                  icon={
                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: "16px",
                     width: 64,
                     height: 64,
                  }}
               />

               <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow={true}
                  trigger={["click"]}
               >
                  <Button type="text">
                     <UserOutlined />
                     <span style={{ marginLeft: 10 }}>{auth?.name}</span>
                  </Button>
               </Dropdown>
            </Header>
            <Content
               style={{
                  margin: "10px",
                  padding: 12,
                  border: "6px",
                  // background: colorBgContainer,
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
export default MainLayout;
