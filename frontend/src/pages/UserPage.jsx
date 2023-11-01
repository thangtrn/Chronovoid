import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Popconfirm, Space, Table, Tooltip, message } from 'antd'
import { CreateModal, EditModal } from '../components/User';
import axiosInstance from '../axios/axiosInstance'
import {
   PlusCircleOutlined,
   DeleteOutlined,
   EditOutlined,
   RedoOutlined
} from '@ant-design/icons';

const UserPage = () => {
   const [openModal, setOpenModal] = useState('')
   const [data, setData] = useState([])
   const [dataSelected, setDataSelected] = useState(null)

   const [search, setSearch] = useState("");

   const columns = [
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
         title: 'Mã nhân viên',
         dataIndex: '_id',
         width: '20%'
      },
      {
         title: 'Họ tên',
         dataIndex: 'name',
         width: '25%'
      },
      {
         title: 'Email',
         dataIndex: 'email',
         filteredValue: [search],
         onFilter: (value, record) => {
            return String(record?.email).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Quyền',
         dataIndex: 'role',
         width: '10%'
      },
   ]

   const fetchTableData = async () => {
      try {
         const res = await axiosInstance.get('/auth/users')
         setData(res?.data?.metadata)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchTableData()
   }, [])

   const handleOpenModal = (key) => {
      setOpenModal(key)
   }

   const handleCloseModal = () => {
      setOpenModal('')
   }

   const handleDeleteItem = async () => {
      if (dataSelected?.role === 'admin') {
         message.warning("Bạn không có quyền xoá tài khoản admin");
         setDataSelected(null);
         return;
      }
      try {
         await axiosInstance.delete(`/auth/users/${dataSelected._id}`);
         message.success('Xoá thành công')
         reload()
      } catch (error) {
         console.log(error);
         message.error(error?.response?.data?.message)
      }
   }

   const handleUncheckRadio = () => {
      setDataSelected(null)
      fetchTableData()
      message.success('Làm mới thành công')
   };

   const reload = () => {
      setDataSelected(null)
      fetchTableData()
   }

   return (
      <div>
         <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space>
               <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => handleOpenModal('add')}
               >
                  Tạo tài khoản
               </Button>

               <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className='btn-green'
                  onClick={() => handleOpenModal('edit')}
                  disabled={!dataSelected}
               >
                  Cập nhật tài khoản
               </Button>

               <Popconfirm
                  title="Xoá tài khoản?"
                  description="Bạn có chắc muốn tài khoản này không?"
                  onConfirm={handleDeleteItem}
                  okText="Có"
                  cancelText="Không"
                  destroyTooltipOnHide
               >
                  <Button
                     type="primary"
                     icon={<DeleteOutlined />}
                     danger
                     disabled={!dataSelected}
                  >
                     Xoá
                  </Button>
               </Popconfirm>
            </Space>
            <Input.Search
               style={{
                  width: "300px",
               }}
               onSearch={(value) => {
                  console.log("---->", value);
                  setSearch(value);
               }}
               allowClear
               placeholder="Email người dùng"
            />
         </Space>

         <div className='table-wrapper'>
            <Table
               size='small'
               rowKey='_id'
               scroll={{ x: 800 }}
               columns={columns}
               dataSource={data}
               rowSelection={{
                  type: 'radio',
                  columnTitle: () => {
                     return (
                        <Tooltip title="Làm mới">
                           <RedoOutlined
                              className="icon-reset-rad-btn"
                              onClick={handleUncheckRadio}
                           />
                        </Tooltip>
                     );
                  },
                  onChange: (_, selectedRows) => {
                     setDataSelected(selectedRows[0]);
                  },
                  selectedRowKeys: dataSelected ? [dataSelected._id] : [],
               }}
            />
         </div>

         <Modal
            open={openModal === 'add'}
            onCancel={handleCloseModal}
            width={700}
            centered={true}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            destroyOnClose
         >
            <h2>Tạo tài khoản</h2>
            <CreateModal reload={reload} onClose={handleCloseModal} />
         </Modal>

         <Modal
            open={openModal === 'edit'}
            onCancel={handleCloseModal}
            width={700}
            centered={true}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            destroyOnClose
         >
            <h2>Cập nhật tài khoản</h2>
            <EditModal reload={reload} onClose={handleCloseModal} data={dataSelected} />
         </Modal>
      </div>
   )
}

export default UserPage