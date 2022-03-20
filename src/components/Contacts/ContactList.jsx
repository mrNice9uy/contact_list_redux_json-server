import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Table, Space } from "antd";
//import api from "../../api/contacts";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddContact from "../AddContactModal/AddContact";

const ContactList = (props) => {
  const contactList = useSelector(state => state.contacts.contacts)
  console.log('sfsfd',contactList);
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

  const handleAddContact = (options) => {
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
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        submitCallback={handleAddContact}
      />
      <Button onClick={() => setModalVisibility(true)}>Add Contact</Button>
      <Divider />
      <Table rowKey="id" columns={columns} dataSource={contactList} />
    </div>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })    
  ).isRequired,
}

export default ContactList;
