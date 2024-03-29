import Logger, {level} from 'lib/logger';

export default class DataService{
	
	constructor(configs, pathName) {
		this.configs = configs;
		this.pathName = pathName;
		this.LOGGER = Logger("DataService", level.INFO);
	}
	
	fetch = async(fetchUrl) => {
		const response = await fetch(
			fetchUrl, 
			{	method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/json, text/plain'
				}
			}
		);
		return await response.json();
	}		
	
	fetchAll = async () => {
		const fetchUrl = this.configs.getUrl(this.pathName);
		this.LOGGER.debug(this.LOGGER.name, "fetchAll", {fetchUrl: fetchUrl});
		return await this.fetch(fetchUrl);
	}

	update = async (data) => {
		const fetchUrl = this.configs.getUrl(this.pathName) + "/" + data.id;
		this.LOGGER.debug(this.LOGGER.name, "update", {fetchUrl: fetchUrl}, {data: data});
		//console.log("FROM DataService.update: data=", JSON.stringify(data), "id=", data.id);
		
		const response = await fetch(
			fetchUrl,
			{
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/json, text/plain'
				}
			}
		);
		const responseJson = await response.json();
		this.LOGGER.debug(this.LOGGER.name, "update", {response: response});
		return responseJson;
	}

/*	fetchByIds = async (idList) => {
		const emptyResult = [];
		if (Array.isArray(idList)){
			if (idList.length > 0){
				const fetchUrl = this.configs.getUrl(this.pathName) + "/" + idList.toString();
				return await this.#fetch(fetchUrl);
			}else{
				return emptyResult;
			}			
		}else{
			return emptyResult;
		}
	}
	
	addNew = async (data) => {
		const fetchUrl = this.configs.getUrl(this.pathName) ;
		console.log("FROM DataService.addNew: data=", JSON.stringify(data));
		const response = await fetch(
			fetchUrl,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/json, text/plain'
				}
			}
		);
		const responseJson = await response.json();
		console.log("FROM DataService.update: responseJson=", responseJson);
		return responseJson;
	}
	
	deleteById = async (id) => {
		const fetchUrl = this.configs.getUrl(this.pathName) + "/" + id;
		console.log("FROM DataService.deleteById: id=", id);
		const response = await fetch(
			fetchUrl,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/json, text/plain'
				}
			}
		);
		console.log("FROM DataService.update: response.staus=", response.statusText);
		return true;
	}	*/
}