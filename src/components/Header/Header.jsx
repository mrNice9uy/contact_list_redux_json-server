import { Button } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../store/actions/user';
import { clearContact } from '../../store/actions/contacts';
import classes from './Header.module.scss';

const Header = props => {
	const { title, user } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toggle = () => {
		dispatch(clearContact());
		dispatch(clearUser());
		navigate('/');
	};
	return (
		<div className={classes.header}>
			<h2>{title}</h2>
			<Button disabled={isEmpty(user)} className={classes.btn} type="primary" onClick={toggle}>
				Log Out
			</Button>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.object,
};

export default Header;
