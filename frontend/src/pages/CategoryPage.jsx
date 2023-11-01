import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Popconfirm, Space, Table, Tooltip, message } from 'antd'
import {
   PlusCircleOutlined,
   DeleteOutlined,
   EditOutlined,
   RedoOutlined
} from '@ant-design/icons';
import { CreateModal, EditModal } from '../components/Category';
import axiosInstance from '../axios/axiosInstance';

const CategoryPage = () => {
   const [openModal, setOpenModal] = useState('')
   const [data, setData] = useState([])
   const [dataSelected, setDataSelected] = useState(null)

   const [search, setSearch] = useState("");

   const columns = [
      {
         title: 'Mã thể loại',
         dataIndex: '_id',
         width: '25%',
      },
      {
         title: 'Tên thể loại',
         dataIndex: 'name',
         width: '35%',
         filteredValue: [search],
         onFilter: (value, record) => {
            return String(record?.name).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: 'Mô tả',
         dataIndex: 'description',
      },
   ]

   const fetchTableData = async () => {
      try {
         const res = await axiosInstance.get('/categories')
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
      try {
         await axiosInstance.delete(`/categories/${dataSelected._id}`);
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
                  Thêm
               </Button>

               <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className='btn-green'
                  onClick={() => handleOpenModal('edit')}
                  disabled={!dataSelected}
               >
                  Sửa
               </Button>

               <Popconfirm
                  title="Xoá ?"
                  description="Bạn có chắc muốn xoá trường này?"
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
               placeholder="Tên thể loại"
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
            <h2>Thêm thể loại</h2>
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
            <h2>Sửa thể loại</h2>
            <EditModal reload={reload} onClose={handleCloseModal} data={dataSelected} />
         </Modal>
      </div>
   )
}

export default CategoryPage