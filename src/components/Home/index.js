import {
  Row,
  Col,
  Input,
  Space,
  Button,
  Modal,
  message,
  Divider,
} from "antd";
import React, { useState, useEffect } from "react";
import AntdTable from "../common/AntdTable";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AntdRow from "../common/AntdRow";
import AntdCol from "../common/AntdCol";
import AntdText from "../common/AntdText";

const { confirm } = Modal;

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
            onClick={() => showConfirm(record)}
          >
            Delete
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
    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) => {
        if (Object.keys(o[k]).length === 5) {
          return Object.values(o[k])
            .join("")
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return String(o[k]).toLowerCase().includes(value.toLowerCase());
      })
    );

    setFilteredData(filterTable);
  };

  const handleDelete = (record) => {
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

  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
        <AntdRow>
          <AntdCol span={12}>
            <AntdText title={"Name"} subtitle={viewData.name} />
          </AntdCol>
          <AntdCol span={12}>
            <AntdText title={"Username"} subtitle={viewData.username} />
          </AntdCol>
        </AntdRow>
        <AntdRow marginTop={".5rem"}>
          <AntdCol span={12}>
            <AntdText title={"Email"} subtitle={viewData.email} />
          </AntdCol>
          <AntdCol span={12}>
            <AntdText title={"Phone"} subtitle={viewData.phone} />
          </AntdCol>
        </AntdRow>
        <Divider />
        <AntdRow>
          <AntdCol span={12}>
            <AntdText title={"Address"} />
          </AntdCol>
        </AntdRow>
        <AntdRow marginTop={".5rem"}>
          <AntdCol span={6}>
            <AntdText
              title={"Suite"}
              subtitle={viewData.address ? viewData.address.suite : ""}
            />
          </AntdCol>
          <AntdCol span={6}>
            <AntdText
              title={"City"}
              subtitle={viewData.address ? viewData.address.city : ""}
            />
          </AntdCol>
          <AntdCol span={6}>
            <AntdText
              title={"Zipcode"}
              subtitle={viewData.address ? viewData.address.zipcode : ""}
            />
          </AntdCol>
          <AntdCol span={3}>
            <AntdText
              title={"Lat."}
              subtitle={viewData.address ? viewData.address.geo.lat : ""}
            />
          </AntdCol>
          <AntdCol span={3}>
            <AntdText
              title={"lng."}
              subtitle={viewData.address ? viewData.address.geo.lng : ""}
            />
          </AntdCol>
        </AntdRow>
        <Divider />
        <AntdRow>
          <AntdCol span={12}>
            <AntdText
              title={"Company"}
              subtitle={viewData.company ? viewData.company.name : ""}
            />
          </AntdCol>
          <AntdCol span={12}>
            <AntdText title={"Website"} subtitle={viewData.website} />
          </AntdCol>
        </AntdRow>
        <AntdRow marginTop={".5rem"}>
          <AntdCol span={24}>
            <AntdText
              title={"Catch phrase"}
              subtitle={viewData.company ? viewData.company.catchPhrase : ""}
            />
          </AntdCol>
        </AntdRow>
        <AntdRow marginTop={".5rem"}>
          <AntdCol span={24}>
            <AntdText
              title={"BS"}
              subtitle={viewData.company ? viewData.company.bs : ""}
            />
          </AntdCol>
        </AntdRow>
      </Modal>
    </>
  );
};

export default Home;
