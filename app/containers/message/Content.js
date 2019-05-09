import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../i18n';
import styles from './styles';
import Markdown from './Markdown';
import { getInfoMessage } from './utils';

const Content = React.memo((props) => {
	if (props.isInfo) {
		return <Text style={styles.textInfo}>{getInfoMessage({ ...props })}</Text>;
	}

	if (props.tmid && !props.msg) {
		return <Text style={styles.text}>{I18n.t('Sent_an_attachment')}</Text>;
	}

	return (
		<Markdown
			msg={props.msg}
			baseUrl={props.baseUrl}
			username={props.user.username}
			isEdited={props.isEdited}
			numberOfLines={props.tmid ? 1 : 0}
		/>
	);
}, (prevProps, nextProps) => prevProps.msg === nextProps.msg);

Content.propTypes = {
	isInfo: PropTypes.bool,
	isEdited: PropTypes.bool,
	tmid: PropTypes.string,
	msg: PropTypes.string,
	baseUrl: PropTypes.string,
	user: PropTypes.object
};
Content.displayName = 'MessageContent';

export default Content;
