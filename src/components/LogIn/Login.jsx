import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../store/actions/user";
//import classes from "./Login.module.scss";

const Login = (props) => {
  //const userRef = useRef();
  //const errRef = useRef();

  //const [user, setUser] = useState("");
  //const [pswd, setPswd] = useState("");
  const [errMsg, setErrMsg] = useState("");
//  const [successMsg, setSuccess] = useState(false);
  const dispatch = useDispatch();

  /*useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pswd]);*/

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:3006/login",
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      //const accessToken = response?.data?.accessToken;
      //setUser("");
      //setPswd("");
      dispatch(setUser(response?.data));
      //setSuccess(true);
      navigate('/profile');
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        console.log("err:", err);
        setErrMsg("Missing Username or psswrd");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorizes");
      } else {
        setErrMsg("Login failed");
      }
    }

    //navigate('/profile');    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section>
        <p
          //ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
      </section>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            //onChange={(e) => setPswd(e.target.value)}
            //value={pswd}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
          <Link style={{ marginLeft: "5px" }} to="/register">
            Sign up
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
