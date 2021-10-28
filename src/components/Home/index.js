import { Row, Col, Input, Space, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import AntdTable from '../common/AntdTable'


const Home = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render:(text, record) => (
        record.address.street
      )
    },
    {
      title: "Actions",
      dataIndex: "Salary",
      key: "Salary",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" style={{ cursor: "pointer" }}>View</Button>
          <Button danger style={{ cursor: "pointer" }} onClick={()=> handleDelete(record)}> Delete </Button> 
        </Space>
      ),
    }
  ];
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isSearch, setIsSearch] = useState(false)


  useEffect(() => {
    userData()
  }, [])

  const userData = async() => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const res = await response.json()
      console.log(res)
      setData(res)
    } catch (error) {
      console.log('something went wrong!!')
    }
  }  

  const search = (value) => {
    console.log("PASS", { value });

    const filterTable = data.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    setFilteredData(filterTable)  
  }

  const handleDelete = (record) => {
    console.log(record)
    setData([...data.filter((v) => v.id !== record.id)])
  }

   return (
     <>
    <Row justify="end" style={{ marginTop: "2rem", marginLeft: "0", marginRight: "0" }}>
      <Col span={6}  style={{ paddingLeft: "0", paddingRight: "0" }}>
        <Input.Search
          placeholder="Search by..."
          enterButton
          onSearch={search}
        />
      </Col>
    </Row>
    <Row style={{ marginTop: "2rem", marginLeft: "0", marginRight: "0",  }}>
      <Col span={24}style={{ paddingLeft: "0", paddingRight: "0" }}>
        <AntdTable dataSource={filteredData.length === 0 ? data : filteredData} columns={columns}/>
      </Col>
    </Row>
    </>
  )
}

export default Home
