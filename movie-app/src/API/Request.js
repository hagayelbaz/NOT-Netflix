
import axios from 'axios';
import Var from "./var";
import {rand} from "../Classes/MathHelper";

/**
 * make request in simple way,
 */
class Request{

    /**
     * return random data from request.
     * data must have result param, array
     * @param data the data to select from
     * @returns {Promise<*>} one data, random
     */
    static async getRandom(data){
        const rnd = rand(0, data?.results?.length);
        return data?.results[rnd];
    }

    /**
     * make a request, no api key need
     * @param path the url for request
     * @param reqParams object, for param
     * @param ignoreError if ignore from errors
     * @returns {Promise<any>}
     */
    static async getRequest(path, reqParams, ignoreError = false){
        try {
            const params = {
                api_key: Var.getApiKey(),
                ...reqParams,
            };
            const response = await axios.get(path, {params});
            return response.data;
        }catch (e){
            if(!ignoreError)
                throw Error(e);
        }
    }

}

export default Request;