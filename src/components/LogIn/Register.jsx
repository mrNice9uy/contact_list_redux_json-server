import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { REGISTER_FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../constants/constants';
import { setUser } from '../../store/actions/user';
import { openNotification } from '../../utils/utils';

const RegistrationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = async values => {
		try {
			const response = await axios.post(
				'http://localhost:3006/register',
				JSON.stringify({
					name: values.name,
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

	return (
		<Form
			{...REGISTER_FORM_ITEM_LAYOUT}
			form={form}
			name="register"
			onFinish={onFinish}
			scrollToFirstError
			autoComplete="off"
		>
			<Form.Item label="Name" name="name">
				<Input />
			</Form.Item>
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
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegistrationForm;
