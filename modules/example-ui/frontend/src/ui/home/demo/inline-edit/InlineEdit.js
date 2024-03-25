import React from 'react';
import Logger, {level} from 'lib/logger';

const InlineEdit = () => {
	const LOGGER = Logger('InlineEdit', level.DEBUG);
	
	return (
		<>
			Hello from InLine Edit Demo
		</>	
	)

}

export default InlineEdit;