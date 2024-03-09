import React from 'react';
import Logger, {level} from 'lib/logger';
import EasyEdit from 'react-easy-edit';
import './TextEdit.css';
import Stack from 'react-bootstrap/Stack';

const TextEdit = ({fieldName, displayLabel, currentValue, onSaveHandler, onCancelHandler}) => {
	
	const LOGGER = Logger("TextEdit", level.INFO);
	LOGGER.debug(LOGGER.name, {fieldName: fieldName}, {currentValue: currentValue});
	
//	const saveEdits = (newValue) => {		
//		LOGGER.debug(LOGGER.name, "saveEdits: currentValue =", currentValue ,"newValue =", newValue);
//		if (onSaveHandler) onSaveHandler(newValue);
//	};

	const saveEdits = (updatedValue) => {		
		LOGGER.debug(LOGGER.name, "saveEdits", {fieldName: fieldName}, {currentValue: currentValue}, {updatedValue: updatedValue});
		if (onSaveHandler) onSaveHandler({fieldName: fieldName, updatedValue: updatedValue})
	};

	const cancelEdits = () => {
		LOGGER.debug(LOGGER.name, "cancelEdits", {currentValue: currentValue});
		if (onCancelHandler) onCancelHandler();		
	};		
		
	return (
		<span onClick={event => event.stopPropagation()}>
			<Stack  direction="horizontal" gap={1}>
				<span className="label">
					{displayLabel}:
				</span>
				<EasyEdit
					type="text"
					value={currentValue}
					onSave={(newValue) => saveEdits(newValue)}
					onCancel={cancelEdits}
					saveOnBlur={true}
					hideSaveButton={true}
					hideCancelButton={true}
					saveButtonLabel=""
					cancelButtonLabel=""					
				/>
			</Stack>
		</span>
	);
}

export default TextEdit;