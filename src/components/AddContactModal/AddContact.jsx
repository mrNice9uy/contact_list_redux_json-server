import { Button, Divider, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
	FORM_ITEM_LAYOUT,
	BUTTON_ITEM_LAYOUT,
	CONTACT_MODAL_RULES,
} from '../../constants/constants';

const AddContact = props => {
	const { modalVisibility, setModalVisibility, submitCallback } = props;

	const [form] = Form.useForm();

	const onFinish = useCallback(
		values => {
			setModalVisibility(false);
			submitCallback(values);
			form.resetFields();
		},
		[setModalVisibility, submitCallback, form],
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
			<Form onFinish={onFinish} form={form} {...FORM_ITEM_LAYOUT}>
				<Form.Item label="Name" name="name" rules={CONTACT_MODAL_RULES.name}>
					<Input />
				</Form.Item>
				<Form.Item label="Email" name="email" rules={CONTACT_MODAL_RULES.email}>
					<Input />
				</Form.Item>
				<Divider />
				<Form.Item {...BUTTON_ITEM_LAYOUT}>
					<Button key="cancel" id="contact-modal-cancel-btn" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="primary" key="submit" id="contact-modal-submit-btn" htmlType="submit">
						Add
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

AddContact.propTypes = {
	modalVisibility: PropTypes.bool.isRequired,
	submitCallback: PropTypes.func.isRequired,
	setModalVisibility: PropTypes.func.isRequired,
};

export default AddContact;
