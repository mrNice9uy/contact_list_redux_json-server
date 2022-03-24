import { Layout, Menu } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import ContactList from '../Contacts/ContactList';
import Header from '../Header/Header';
import Login from '../LogIn/Login';
import RegistrationForm from '../LogIn/Register';
import Profile from '../Profile/Profile';

const MainScreen = () => {
	const { Content, Sider } = Layout;

	const state = useSelector(state => state);
	const [title, setTitle] = useState('');
	const location = useLocation();

	useEffect(() => {
		switch (location.pathname) {
			case '/profile': {
				return setTitle('Profile');
			}
			case '/contacts': {
				return setTitle('Contacts');
			}
			case '/register': {
				return setTitle('New user');
			}
			default:
				return setTitle('Log In');
		}
	}, [location.pathname]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider>
				<Menu theme="dark" defaultSelectedKeys={['profile']} mode="inline">
					<Menu.Item disabled={isEmpty(state.user)} key="profile">
						Profile
						<Link to="/profile" />
					</Menu.Item>
					<Menu.Item disabled={isEmpty(state.user)} key="contacts">
						Contacts
						<Link to="/contacts" />
					</Menu.Item>
					<Menu.Item key="login" style={{ display: 'none' }}>
						Log In
						<Link to="/" />
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header title={title} user={state.user} />
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						background: '#fff',
						minHeight: 280,
					}}
				>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<RegistrationForm />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/contacts" element={<ContactList />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};

MainScreen.propTypes = {
	state: PropTypes.shape({
		user: PropTypes.object,
		contacts: PropTypes.shape({
			contacts: PropTypes.array,
		}),
	}),
};

export default MainScreen;
