import {
  Row,
  Col,
  Input,
  Space,
  Button,
  Modal,
  message,
  Typography,
  Divider,
} from "antd";
import React, { useState, useEffect } from "react";
import AntdTable from "../common/AntdTable";

const { Text } = Typography;

const Home = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => record.address.street,
    },
    {
      title: "Actions",
      dataIndex: "Salary",
      key: "Salary",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ cursor: "pointer" }}
            onClick={() => showModal(record)}
          >
            View
          </Button>
          <Button
            danger
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          >
            {" "}
            Delete{" "}
          </Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewData, setViewData] = useState({});

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const res = await response.json();
      console.log(res);
      setData(res);
    } catch (error) {
      console.log("something went wrong!!");
    }
  };

  const search = (value) => {
    console.log("PASS", { value });

    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilteredData(filterTable);
  };

  const handleDelete = (record) => {
    // console.log(record)
    setData([...data.filter((v) => v.id !== record.id)]);
    message.success("User is deleted!");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (record) => {
    setViewData(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setViewData({});
  };

  return (
    <>
      <Row
        justify="end"
        style={{ marginTop: "2rem", marginLeft: "0", marginRight: "0" }}
      >
        <Col span={6} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Input.Search
            placeholder="Search by..."
            enterButton
            onSearch={search}
            onChange={(e) => search(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem", marginLeft: "0", marginRight: "0" }}>
        <Col span={24} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <AntdTable
            dataSource={filteredData.length === 0 ? data : filteredData}
            columns={columns}
            scroll={{ y: 440 }}
          />
        </Col>
      </Row>
      <Modal
        title="User Details"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Row style={{ marginLeft: "0", marginRight: "0" }}>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Name</Text>
              <Text type="secondary">{viewData.name}</Text>
            </Space>{" "}
          </Col>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Username</Text>
              <Text type="secondary">{viewData.username}</Text>
            </Space>{" "}
          </Col>
        </Row>
        <Row style={{ marginTop: ".5rem", marginLeft: "0", marginRight: "0" }}>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Email</Text>
              <Text type="secondary">{viewData.email}</Text>
            </Space>{" "}
          </Col>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Phone</Text>
              <Text type="secondary">{viewData.phone}</Text>
            </Space>{" "}
          </Col>
        </Row>
        <Divider />
        <Row style={{ marginLeft: "0", marginRight: "0" }}>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Address</Text>
            </Space>{" "}
          </Col>
        </Row>
        <Row style={{ marginTop: ".5rem", marginLeft: "0", marginRight: "0" }}>
          <Col span={6} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Suite</Text>
              <Text type="secondary">
                {viewData.address ? viewData.address.suite : ""}
              </Text>
            </Space>{" "}
          </Col>
          <Col span={6} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>City</Text>
              <Text type="secondary">
                {viewData.address ? viewData.address.city : ""}
              </Text>
            </Space>{" "}
          </Col>
          <Col span={6} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Zipcode</Text>
              <Text type="secondary">
                {viewData.address ? viewData.address.zipcode : ""}
              </Text>
            </Space>{" "}
          </Col>
          <Col span={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Lat.</Text>
              <Text type="secondary">
                {viewData.address ? viewData.address.geo.lat : ""}
              </Text>
            </Space>{" "}
          </Col>
          <Col span={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Lng.</Text>
              <Text type="secondary">
                {viewData.address ? viewData.address.geo.lng : ""}
              </Text>
            </Space>{" "}
          </Col>
        </Row>
        <Divider />
        <Row style={{ marginLeft: "0", marginRight: "0" }}>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Company</Text>
              <Text type="secondary">{viewData.company ? viewData.company.name : ''}</Text>
            </Space>{" "}
          </Col>
          <Col span={12} style={{ paddingLeft: "0", paddingRight: "0" }}>
            <Space direction="vertical">
              <Text strong>Website</Text>
              <Text type="secondary">{viewData.website}</Text>
            </Space>{" "}
          </Col>
        </Row>
        <Row style={{ marginTop: ".5rem", marginLeft: "0", marginRight: "0" }}>
        <Col span={24} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Space direction="vertical">
            <Text strong>Catch phrase</Text>
            <Text type="secondary">{viewData.company ? viewData.company.catchPhrase : ''}</Text>
          </Space>{" "}
        </Col>
      </Row>
      <Row style={{ marginTop: ".5rem", marginLeft: "0", marginRight: "0", marginBottom: ".5rem" }}>
        <Col span={24} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Space direction="vertical">
            <Text strong>BS</Text>
            <Text type="secondary">{viewData.company ? viewData.company.bs : ''}</Text>
          </Space>{" "}
        </Col>
      </Row>
      </Modal>
    </>
  );
};

export default Home;

// {
//   "website": "hildegard.org",
//   "company": {
//   "name": "Romaguera-Crona",
//   "catchPhrase": "Multi-layered client-server neural-net",
//   "bs": "harness real-time e-markets"
//   }
//   }
