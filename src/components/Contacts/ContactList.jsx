import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Popconfirm, Table, message } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import AddContact from "../AddContactModal/AddContact";
import EditContact from "../EditContactModal/EditContact";
import Spinner from "../Spinner/Spinner";
import {
  addContact,
  deleteContactById,
  updateContactById,
  getContacts,
} from "../../store/actions/contacts";
import { CONTACTS_COLUMNS } from "../../constants/columns";
import classes from "./Contacrs.module.scss";
import { isEmpty } from "lodash";

const mapStateToProps = (state) => ({
  contactList: state.contacts.contacts,
  user: state.user,
  isConnectionInProgress: state.contacts.isConnectionInProgress,
});

const ContactList = (props) => {
  const { contactList, user, isConnectionInProgress } = props;
  const { Search } = Input;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editModalVisibility, setContactEditModalVisibility] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch(getContacts());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!isEmpty(contactList)) {
      setFilteredData(
        contactList.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [contactList, search]);

  const setNewId = () => {
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
    dispatch(addContact(contactData));
  };

  const onEditContact = useCallback(
    (item) => {
      setEditingKey(item.id);
      setContactEditModalVisibility(true);
    },
    [setContactEditModalVisibility]
  );

  const deleteRecord = useCallback(
    (id) => {
      dispatch(deleteContactById(id));
    },
    [dispatch]
  );

  const confirm = useCallback(
    (id) => {
      deleteRecord(id);
    },
    [deleteRecord]
  );

  const cancel = () => {
    message.error("Canceled");
  };

  const renderActionBtns = useCallback(
    (item) => {
      return (
        <>
          <Button
            key={item.id}
            icon={<EditOutlined />}
            onClick={() => onEditContact(item)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => confirm(item.id)}
            onCancel={cancel}
          >
            <Button
              style={{
                background: "#ff4d4f",
                border: "none",
                marginLeft: "5px",
              }}
              type="primary"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      );
    },
    [confirm, onEditContact]
  );

  const prepareModalData = (data) => {
    if (data.length !== 0) {
      const contactData = contactList.find((item) => item.id === editingKey);
      return contactData;
    }
  };

  const renderData = (data) => {
    if (!data) {
      return null;
    }

    return data.map((item) => ({
      ...item,
      action: renderActionBtns(item),
    }));
  };

  const editData = (data) => {
    const contactId = editingKey;
    const updatetedContactData = {
      contactId: contactId,
      ...data,
    };

    dispatch(updateContactById(updatetedContactData));
    setContactEditModalVisibility(false);
  };

  return (
    <>
      <AddContact
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        submitCallback={handleAddContact}
      />
      <div className={classes.searchBarWrapper}>
        <Button disabled={isEmpty(user)} onClick={() => setModalVisibility(true)}>Add Contact</Button>
        <Search
          allowClear
          style={{ width: "40%" }}
          defaultValue=""
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Divider />

      <Spinner spinning={isConnectionInProgress}>
        <EditContact
          title="Edit contact"
          isShown={editModalVisibility}
          submitCallback={editData}
          contactData={prepareModalData(contactList)}
          editingKey={editingKey}
          setModalVisibility={setContactEditModalVisibility}
        />

        <Table
          rowKey="id"
          columns={CONTACTS_COLUMNS}
          dataSource={renderData(filteredData)}
        />
      </Spinner>
    </>
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

export default connect(mapStateToProps)(ContactList);
