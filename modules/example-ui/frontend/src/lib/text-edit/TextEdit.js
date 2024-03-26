import React, {useState, useEffect} from 'react';
import Logger, {level} from 'lib/logger';
import EasyEdit from 'react-easy-edit';
import './TextEdit.css';
import Stack from 'react-bootstrap/Stack';

const TextEdit = ({fieldName, displayLabel, value, saveHandler, cancelHandler}) => {
	const COMPONENT_NAME = 'TextEdit';
	const LOGGER = Logger(COMPONENT_NAME, level.INFO);
	LOGGER.debug(LOGGER.name, {fieldName: fieldName}, {value: value});
	
	const [resetValue, setResetValue] = useState("");
	
	useEffect(()=>{
		const LOGGER = Logger(COMPONENT_NAME);
		LOGGER.debug(LOGGER.name, "value-hook", {value: value});
		setResetValue(value);
	},[value]);

	const saveEdits = (updatedValue) => {		
		LOGGER.debug(LOGGER.name, "saveEdits", {fieldName: fieldName}, {value: value}, {updatedValue: updatedValue});
		if (saveHandler) saveHandler({fieldName: fieldName, updatedValue: updatedValue})
	};

	const cancelEdits = () => {
		LOGGER.debug(LOGGER.name, "cancelEdits", {fieldName: fieldName}, {value: value}, {resetValue: resetValue});
		if (cancelHandler) cancelHandler({fieldName, resetValue});		
	};
		
	return (
		<span onClick={event => event.stopPropagation()}>
			<Stack  direction="horizontal" gap={1}>
				<span className="label">
					{displayLabel}:
				</span>
				<EasyEdit
					type="text"
					value={resetValue}
					onSave={(newValue) => saveEdits(newValue)}
					onCancel={() => cancelEdits()}
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