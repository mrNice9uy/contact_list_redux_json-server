import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Table, Space } from "antd";
import React, { useState } from "react";
import AddContact from "../AddContactModal/AddContact";

const ContactList = (props) => {
  const { contacts, setContacts } = props;
  const [modalVisibility, setModalVisibility] = useState(false);
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button
            style={{ background: "#ff4d4f", border: "none" }}
            type="primary"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddUser = (options) => {
    const { name, email } = options;

    const contactData = {
      name,
      email,
      host: "localhost",
    };

    props.addUser(contactData);
  };

  return (
    <div id="contactList">
      <AddContact
        contacts={contacts}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        submitCallback={handleAddUser}
      />
      <Button onClick={() => setModalVisibility(true)}>Add Contact</Button>
      <Divider />
      <Table rowKey="id" columns={columns} dataSource={contacts} />
    </div>
  );
};

export default ContactList;
