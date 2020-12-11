import { config } from "../config/config.js";
import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool(config.database, CONCURRENT_CONNECTIONS);

const executeQuery = async(query, ...params) => {
    const client = await connectionPool.connect();
    try {
        return await client.query(query, ...params);
    } catch (e) {
        console.log(e);  
    } finally {
        client.release();
    }
return null;
};

let ca = {};
const executeCachedQuery = async(query, ...params) => {
    const key = query + params.reduce((acc, o) => acc + "-" + o, "");
    if (key.startsWith('INSERT' || key.startsWith('UPDATE'))) {
      ca = {};
    }
    if (ca[key]) {
        return ca[key];
    }
    const res = await executeQuery(query, ...params);
    ca[key] = res;

    return res;
}
export { executeQuery, executeCachedQuery };