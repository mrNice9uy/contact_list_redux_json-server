import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Table, Popconfirm, message } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect, useDispatch } from "react-redux";
//import { connect } from "react-redux";
import AddContact from "../AddContactModal/AddContact";
import Spinner from "../Spinner/Spinner";
import {
  addContact,
  deleteContactById,
  getContacts,
} from "../../store/actions/contacts";
import { CONTACTS_COLUMNS } from "../../constants/columns";

const ContactList = (props) => {
  console.log("props: ", props);
  const { contactList, isConnectionInProgress } = props;
  console.log("sfsfd", contactList);
  const [modalVisibility, setModalVisibility] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const setNewId = () => {
    debugger;
    let numArr = [];
    contactList.forEach((item) => numArr.push(item.id));
    return Math.max.apply(null, numArr) + 1;
  };

  const handleAddContact = (options) => {
    const { name, email } = options;
    const contactData = {
      id: setNewId(),
      name,
      email,
    };
    console.log(contactData);
    dispatch(addContact(contactData));
  };

  const deleteRecord = useCallback(
    (id) => {
      dispatch(deleteContactById(id));
    },
    [dispatch]
  );

  const confirm = useCallback((id) => {
    message.success('Deleted successfully');
    deleteRecord(id)
  }, [deleteRecord]);

  const cancel = () => {
    message.error('Canceled');
  }

  const editRecord = useCallback((id) => {
    debugger;
    console.log("edit:", id);
    //setModalVisibility(true)
  },[])

  const renderActionBtns = useCallback(
    (id) => {
      debugger
      return (
        <Space>
          <Button icon={<EditOutlined onClick={()=>editRecord(id)} />}>
            Edit
          </Button>
          <Popconfirm title='Are you sure?' okText='Yes' cancelText='No' onConfirm={()=>confirm(id)} onCancel={cancel}>
            <Button
              style={{ background: "#ff4d4f", border: "none" }}
              type="primary"
              icon={<DeleteOutlined />}
              
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      );
    },
    [confirm, editRecord]
  );

  const generatedData = useMemo(() => {
    return contactList?.map(({ key, id, name, email }) => {
      const deleteBtn = renderActionBtns(id);
      return {
        key,
        id,
        name,
        email,
        action: deleteBtn,
      };
    });
  }, [contactList, renderActionBtns]);

  return (
    <Spinner spinning={isConnectionInProgress}>
      <AddContact
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        submitCallback={handleAddContact}
      />
      <Button onClick={() => setModalVisibility(true)}>Add Contact</Button>
      <Divider />
      <Table
        rowKey="id"
        columns={CONTACTS_COLUMNS}
        dataSource={generatedData}
      />
    </Spinner>
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
};

const mapStateToProps = (state) => ({
  contactList: state.contacts.contacts,
  isConnectionInProgress: state.contacts.isConnectionInProgress,
});

export default connect(mapStateToProps)(ContactList);

/* try w/ out dispatch

export default connect(mapStateToProps, {
  getContacts,
  setContacts
})(ContactList); 
*/