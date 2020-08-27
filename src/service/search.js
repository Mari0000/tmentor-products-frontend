import axios from "axios";
import { BASE_URL } from "../Constants";
const instance = axios.create({
    baseURL: `${BASE_URL()}/products/search`,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
  });

export const search = async (data) => {
    console.log(data);
    try {   
        const result = instance.get(
            instance.baseURL,
            { params: data},
              {
                validateStatus: () => true
              }
            );
        console.log(result);
        return result;    
    } catch (error) {
        console.log(error);
    }
}