import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";


export const http = axios.create({
    baseURL : 'https://fieldby-web-default-rtdb.asia-southeast1.firebasedatabase.app',
    Accept : 'application.json',
    adapter : cacheAdapterEnhancer(
        axios.defaults.adapter,
        {enabledByDefault:false}
    ),
})