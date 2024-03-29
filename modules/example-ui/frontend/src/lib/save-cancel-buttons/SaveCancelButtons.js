import React from 'react';
import Logger, {level} from 'lib/logger';
import styles from "./SaveCancelButtons.module.css";

const SaveCancelButtons = ({onSaveHandler, onCancelHandler, updatedData, isEnabled}) => {
	
	const LOGGER = Logger("SaveCancelButtons", level.INFO);
		
	const onSave = (event) =>{		
		LOGGER.debug(LOGGER.name, "onSave-triggered: isEnabled =", isEnabled);
		if (onSaveHandler && updatedData) {
			onSaveHandler(updatedData);
		}else{
			if (!onSaveHandler){
				LOGGER.warn(LOGGER.name, "onSave", "onSaveHandler not specified")	
			}else{
				LOGGER.debug(LOGGER.name, "onSave", "No pending updates")
			}
		}
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