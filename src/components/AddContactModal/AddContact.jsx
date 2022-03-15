import { Button, Divider, Form, Input, Modal } from "antd";
import React, { useCallback } from "react";

const AddContact = (props) => {
  const { modalVisibility, setModalVisibility, submitCallback } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  const addContactModalRules = {
    name: [
      {
        required: true,
        message: "Please input name!",
        whitespace: true,
      },
    ],
    email: [
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
      {
        required: true,
        message: "Please input your E-mail!",
      },
    ],
  };

  const onFinish = useCallback(
    (values) => {
      setModalVisibility(false);
      submitCallback(values);
      form.resetFields();
    },
    [setModalVisibility, submitCallback, form]
  );

  const onCancel = () => {
    setModalVisibility(false);
  };

  return (
    <Modal
      title="Create a new contact"
      visible={modalVisibility}
      afterClose={form.resetFields}
      footer={false}
      onCancel={onCancel}
    >
      <Form onFinish={onFinish} form={form} {...formItemLayout}>
        <Form.Item label="Name" name="name" rules={addContactModalRules.name}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={addContactModalRules.email}
        >
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item {...buttonItemLayout}>
          <Button key="cancel" id="contact-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            key="submit"
            id="contact-modal-submit-btn"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContact;
