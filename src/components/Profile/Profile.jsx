import { Form, Input, Button, Divider } from "antd";
import axios from "axios";
import { isEmpty, pick } from "lodash";
import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { setUserInfo } from "../../store/actions/user";
import { openNotification } from "../../utils/utils";
import { PROFILE_LAYOUT } from "../../constants/constants";
import classes from './Profile.module.scss';

const mapStateToProps = (state) => ({
  user: state.user,
  isConnectionInProgress: state.contacts.isConnectionInProgress,
});

const Profile = (props) => {
  const { isConnectionInProgress, user } = props;
  const avatarUrl = faker.image.avatar();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userState = user.user;

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3006/usersinfo/${userState?.user?.id}`
      );
      form.setFieldsValue(pick(userState?.user, ["name", "email"]));
      form.setFieldsValue(
        pick(response?.data, ["lastName", "website", "introduction"])
      );
    } catch (err) {
      if (!err?.response) {
        openNotification("error", "Something is wrong!", "No server response");
      } else if (err.response?.status === 404) {
        openNotification(
          "error",
          err.response?.status,
          err.response?.statusText
        );
      } else {
        openNotification("error", err.response?.status, err.response?.data);
      }
    }
  }, [form, userState]);

  useEffect(() => {
    if (!isEmpty(userState)) {
      getUserInfo();
    }
  }, [getUserInfo, userState]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3006/usersinfo/${userState?.user?.id}`,
        JSON.stringify({
          name: values.name,
          lastName: values.lastName,
          birthday: values.birthday,
          website: values.website,
          introduction: values.introduction,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(setUserInfo(response?.data));
      openNotification("success", "Great!", "Profile is updated successfully.");
    } catch (err) {
      if (!err?.response) {
        openNotification("error", "Something is wrong!", "No server response");
      } else if (err.response?.status === 404) {
        openNotification(
          "error",
          err.response?.status,
          err.response?.statusText
        );
      } else {
        openNotification("error", err.response?.status, err.response?.data);
      }
    }
  };

  return (
    <Spinner spinning={isConnectionInProgress}>
      <div className={classes.textImgWrapper}>        
        <div className={classes.avatar}>
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className={classes.text}>
          <h3>Hello, {`${userState?.user?.name || "Stranger"}`}!</h3>
          <h4>Set some info or check your contact list</h4>
        </div>
      </div>
      <Divider />
      <Form
        {...PROFILE_LAYOUT}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
      >
        <Form.Item name={["name"]} label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name={["lastName"]} label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item
          name={["email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input disabled style={{ background: 'none', color: 'black'}} />
        </Form.Item>
        <Form.Item name={["website"]} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={["introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...PROFILE_LAYOUT.wrapperCol, offset: 8 }}>
          <Button onClick={() => form.resetFields()}>Reset</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      );
    </Spinner>
  );
};

Profile.propTypes = {
  userState: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(Profile);
