import { send } from '../deps.js';

const errormiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const timingmiddleware = async({ request }, next) => {
  const now = Date.now();
  await next();
}

const servemiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const control = async({request, response, session}, next) => {
  if (request.url.pathname.startsWith('/behavior')) {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.status = 401;
      response.redirect('/auth/login');
      await next();
    }
  } else {
    await next();
  }
}

export { errormiddleware, timingmiddleware, servemiddleware, control };