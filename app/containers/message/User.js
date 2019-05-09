import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import sharedStyles from '../../views/Styles';
import messageStyles from './styles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	username: {
		fontSize: 16,
		lineHeight: 22,
		...sharedStyles.textColorNormal,
		...sharedStyles.textMedium
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	alias: {
		fontSize: 14,
		...sharedStyles.textColorDescription,
		...sharedStyles.textRegular
	},
	temp: {
		opacity: 0.3
	}
});

const User = React.memo(({
	isHeader, useRealName, author, isTemp, alias, ts, timeFormat
}) => {
	if (isHeader) {
		const username = (useRealName && author.name) || author.username;
		const aliasUsername = alias ? (<Text style={styles.alias}> @{username}</Text>) : null;
		const time = moment(ts).format(timeFormat);

		return (
			<View style={[styles.container, isTemp && styles.temp]}>
				<View style={styles.titleContainer}>
					<Text style={styles.username} numberOfLines={1}>
						{alias || username}
						{aliasUsername}
					</Text>
				</View>
				<Text style={messageStyles.time}>{time}</Text>
			</View>
		);
	}
	return null;
}, (prevProps, nextProps) => prevProps.isTemp === nextProps.isTemp);

User.propTypes = {
	isHeader: PropTypes.bool,
	useRealName: PropTypes.bool,
	author: PropTypes.object,
	isTemp: PropTypes.bool,
	alias: PropTypes.string,
	ts: PropTypes.string,
	timeFormat: PropTypes.string
};
User.displayName = 'MessageUser';

export default User;
