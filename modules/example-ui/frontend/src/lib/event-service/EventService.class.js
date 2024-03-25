import Logger, {level} from 'lib/logger';

export default class EventService{
	static INITIAL_WAIT_SECONDS = 1;
	static MAX_WAIT_SECONDS = 64;
	
	constructor(configs, pathName) {
		this.configs = configs;
		this.pathName = pathName;
		this.LOGGER = Logger("EventService", level.INFO);
	}

	getEventsUrl = () => {
		return this.configs.getUrl(this.pathName) + "/events";
	}
	
	listen = (messageHandler) => {
		var retryAfter = EventService.INITIAL_WAIT_SECONDS;
		var sseSource = null;
		
		const errorHandler = () =>{
		    retryAfter = retryAfter * 2;
		    if (retryAfter > EventService.MAX_WAIT_SECONDS) {
		        retryAfter = EventService.MAX_WAIT_SECONDS;
		    }
		    this.LOGGER.debug(this.LOGGER.name, "listen.errorHandler (triggered)", {retryAfter: retryAfter});
			setTimeout(doSetup, (retryAfter * 1000));
			this.LOGGER.debug(this.LOGGER.name, "listen.errorHandler (post-processing)", {retryAfter: retryAfter});
		};
		
		const openHandler = () =>{
			this.LOGGER.debug(this.LOGGER.name, "listen.openHandler (triggered)");
		};		
		
		const doSetup = () => {
			if (sseSource){
				sseSource.close();
				sseSource = null;
			}
			const eventsUrl = this.getEventsUrl(); 	
			this.LOGGER.debug(
				this.LOGGER.name, 
				"listen.doSetup (triggered)", 
				{retryAfter: retryAfter}, 
				{sseSourceIsNull: (sseSource ? false : true)},
				{eventsUrl: eventsUrl}
			);		
			sseSource = new EventSource(eventsUrl);
			sseSource.onmessage = messageHandler;
			sseSource.onopen = openHandler;
			sseSource.onerror = errorHandler;
			this.LOGGER.debug(this.LOGGER.name, "listen.doSetup (post-processing)", {retryAfter: retryAfter}, {sseSourceIsNull: (sseSource ? false : true)});
		};
		
		
		doSetup();
		this.LOGGER.debug(this.LOGGER.name, "listen (post-initial-setup)", {retryAfter: retryAfter}, {sseSourceIsNull: (sseSource ? false : true)});
	};	
}