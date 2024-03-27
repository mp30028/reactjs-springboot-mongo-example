import React, { useEffect, useState } from 'react';
import Logger, {level} from 'lib/logger';
import TextEdit from 'lib/text-edit';

const InlineComboEdit = () => {
	const COMPONENT_NAME = 'InlineComboEdit';
	const LOGGER = Logger(COMPONENT_NAME, level.INFO);
	const DEFAULT_VALUE = "This is a default value";
	const [currentValue, setCurrentValue] = useState(DEFAULT_VALUE);
	
	const onUpdateHandler = (update) =>{
		LOGGER.debug(LOGGER.name, "onUpdateHandler: before update of current value",  {update: update}, {currentValue: currentValue});
		setCurrentValue(update.updatedValue);
	}
	
	useEffect(()=>{
		const LOGGER = Logger(COMPONENT_NAME);
		LOGGER.debug(LOGGER.name, "currentValue-Hook",  {currentValue: currentValue});
	},[currentValue])
	
	const doReset = () =>{
		setCurrentValue(DEFAULT_VALUE);
	}
	
	return (
		<>
			<TextEdit fieldName='Input'
				displayLabel='Input text'  
				value={currentValue} 
				saveHandler={onUpdateHandler} 
			/>
			
			<input type='button' id='resetButton' name= 'resetButton' onClick={doReset} value="reset" />
		</>	
	)

}

export default InlineComboEdit;