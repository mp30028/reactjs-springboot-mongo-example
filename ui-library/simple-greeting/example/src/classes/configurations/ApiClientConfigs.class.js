
export default class ApiClientConfigs{
	
	static paths = {
		SimpleGreeting: "/greeting",
		Greetings: "/api/greetings"
	}
	
	constructor(){
		const allEnvVarsSet = (
			("REACT_APP_ENV_API_PROTOCOL" in process.env) &&
			("REACT_APP_ENV_API_HOST" in process.env) &&
			("REACT_APP_ENV_API_PORT" in process.env) 
		);
		if (allEnvVarsSet){
			this.envVars = {
				REACT_APP_ENV_API_PROTOCOL: `${process.env.REACT_APP_ENV_API_PROTOCOL}`,
				REACT_APP_ENV_API_HOST: `${process.env.REACT_APP_ENV_API_HOST}`,
				REACT_APP_ENV_API_PORT: `${process.env.REACT_APP_ENV_API_PORT}`,
			}
		}else{
			this.envVars = this.synchronousFetchEnvVars();
		}
	}
		
	synchronousFetchEnvVars() {
		const fetchUrl = "/environment-variables";
   		const xhr = new XMLHttpRequest();
   		xhr.open('GET', fetchUrl, false);
   		xhr.send(null);
   		if (xhr.status === 200) {
      		return JSON.parse(xhr.responseText);
   		} else {
      		throw new Error('Request failed: ' + xhr.statusText);
   		}
	}		
		
	
	baseUrl = () =>{
		return this.envVars.REACT_APP_ENV_API_PROTOCOL + "://" + this.envVars.REACT_APP_ENV_API_HOST + ":" + this.envVars.REACT_APP_ENV_API_PORT;	
	};

	getUrl = (pathName) => {
		return this.baseUrl() + ApiClientConfigs.paths[pathName];
	}
}