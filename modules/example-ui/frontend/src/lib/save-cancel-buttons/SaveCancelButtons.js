import React from 'react';
import Logger, {level} from 'lib/logger';
import styles from "./SaveCancelButtons.module.css";

const SaveCancelButtons = ({onSaveHandler, onCancelHandler, isEnabled}) => {
	
	const LOGGER = Logger("SaveCancelButtons", level.INFO);
		
	const onSave = (event) =>{		
		LOGGER.debug(LOGGER.name, "onSave-triggered: isEnabled =", isEnabled);
		if (onSaveHandler)	onSaveHandler();
		event.stopPropagation();
	}
	
	const onCancel = (event) =>{		
		LOGGER.debug(LOGGER.name, "onCancel-triggered: isEnabled =", isEnabled);
		if (onCancelHandler) onCancelHandler();
		event.stopPropagation();
	}


	return (
		<>
			{isEnabled &&
				<span className={styles.saveCancelButtons}>				 
					<input type='button' id='saveButton' name= 'saveButton' onClick={onSave}/>
					<input type='button' id='cancelButton' name= 'cancelButton' onClick={onCancel} />
				</span>
			}
		</>
	);			
}

export default SaveCancelButtons;