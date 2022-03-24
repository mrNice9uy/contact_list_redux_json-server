import { notification } from 'antd';

export const getCurrentDate = () => {
	const date = new Date();
	return (
		String(date.getDate()).padStart(2, '0') +
		'/' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'/' +
		date.getFullYear()
	);
};

export const openNotification = (type, status, text) => {
	notification[type]({
		message: status,
		description: text,
	});
};
