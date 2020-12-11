import { executeQuery, executeCachedQuery } from "../database/database.js";

const checkuser = async(email) => {
    const existingUsers = await executeCachedQuery("SELECT * FROM users WHERE email = $1", email);
    return existingUsers;
};

const useradd = async(email,hash) => {  
    await executeCachedQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
};

const setSession = async({session},userObj) => {
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
};

const registrate = async (request) => {
  const data = {
    email: '',
    password: '',
    verification: '',
    errors: null, 
    success: null
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
    data.verification = params.get("verification");
  }
  return data;
};

const logininfo = async (request) => {
  const data = {
    email: '',
    password: '',
    errors: null, 
    success: null
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
  }
  return data;
};


const clean = async({session}) => {
    await session.set('authenticated', false);
    await session.set('user', {
        id: null,
        email: null
    });
};

export { checkuser, useradd, registrate, logininfo, setSession, clean };