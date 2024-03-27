import React, {useState, useEffect} from 'react';
import Logger, {level} from 'lib/logger';
import EasyEdit from 'react-easy-edit';
import './ComboEdit.css';
import Stack from 'react-bootstrap/Stack';

const ComboEdit = ({fieldName, displayLabel, value, pickList, saveHandler, cancelHandler}) => {
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
	
	const generateOptionsList = () => {
    return [
      { label: "First option", value: "one" },
      { label: "Second option", value: "two" },
      { label: "Third option", value: "three" }
    ];
  };
		
	return (
		<span onClick={event => event.stopPropagation()}>
			<Stack  direction="horizontal" gap={1}>
				<span className="label">
					{displayLabel}:
				</span>
				<EasyEdit
					type="select"
					options={generateOptionsList()}
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

export default ComboEdit;