import {default as Loglevel} from 'loglevel';

export default class Logger{

	static TRACE = "TRACE";
	static DEBUG = "DEBUG";
	static INFO = "INFO";
	static WARN = "WARN";
	static ERROR = "ERROR";	 
	
	constructor(name, level) {
		this.logger = Loglevel.getLogger(name);
		this.logger.setLevel(level);
	}
	
	getLogger = () => {
		return this.logger;
	}

}