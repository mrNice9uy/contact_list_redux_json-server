import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setUser } from '../../store/actions/user';
import { openNotification } from '../../utils/utils';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = async values => {
		try {
			const response = await axios.post(
				'http://localhost:3006/login',
				JSON.stringify({
					email: values.email,
					password: values.password,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				},
			);
			dispatch(setUser(response?.data));
			navigate('/profile');
		} catch (err) {
			if (!err?.response) {
				openNotification('error', 'Something is wrong!', 'No server response');
			} else if (err.response?.status === 404) {
				openNotification('error', err.response?.status, err.response?.statusText);
			} else {
				openNotification('error', err.response?.status, err.response?.data);
			}
		}
	};

	const onFinishFailed = errorInfo => {
		openNotification('error', 'Error!', 'Set correct credentials');
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 8 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				name="email"
				label="E-mail"
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Log In
				</Button>
				<Link style={{ marginLeft: '5px' }} to="/register">
					Sign up
				</Link>
			</Form.Item>
		</Form>
	);
};

export default Login;
