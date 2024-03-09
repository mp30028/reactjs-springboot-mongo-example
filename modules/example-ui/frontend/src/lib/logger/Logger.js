import {default as Loglevel} from 'loglevel';

class loggerLevelsClass{
	
	static level = {
		TRACE: "TRACE",
		DEBUG: "DEBUG",
		INFO: "INFO",
		WARN: "WARN",
		ERROR: "ERROR"	 	
	}
}

export const loggerLevel = loggerLevelsClass.level;

const Logger = ((name, level) => {
	const logger = Loglevel.getLogger(name);
	if (level) logger.setLevel(level);
	return logger;
});

export default Logger;