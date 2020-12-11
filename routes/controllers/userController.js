import { checkuser, useradd, registrate, logininfo, setSession, clean } from "../../services/userService.js";
import { validate, required, isEmail, minLength } from "../../deps.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


const RegistrationValidationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
    verification: [required, minLength(4)],
};

const LoginValidationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};

const registrationform1 = async({request, render}) => {
    const data = await registrate(request);
    const [passes, errors] = await validate(data, RegistrationValidationRules);

    if (!passes) {
        data.errors = errors;
        render("register.ejs", data);
        return;
    } 

    if (data.password !== data.verification) {
        data.errors = { verification : { notverified : 'The entered passwords did not match' } };
        render("register.ejs", data);
        return;
    }

    const existingUsers = await checkuser(data.email);
    if (existingUsers.rowCount > 0) {
        data.errors = { existing : { reserved : 'The email is already reserved.' } };
        render("register.ejs", data);
        return;
    }

    
    const hash = await bcrypt.hash(data.password);
    useradd(data.email, hash);
    data.success = 'Registration successful!';
    render("register.ejs", data);
};

const registrationform = async({session,render}) => {
    clean({session:session});
    const data = await registrate();
    render('register.ejs', data);
};

const loginredirect = async({session, response, render}) => {
    response.redirect('/auth/login');
    await showLoginForm({session:session, render:render});
    return;
};

const showLoginForm = async({session, render}) => {
    if (session) {
        clean({session:session});
    }
    const data = await logininfo();
    render('login.ejs', data);
};

const loginform1 = async({request, session, render}) => {
    const data = await logininfo(request);
    const [passes, errors] = await validate(data, LoginValidationRules);

    if (!passes) {
        data.errors = errors;
        render("login.ejs", data);
        return;
    }
  

    const existingUsers = await checkuser(data.email);
    if (existingUsers.rowCount === 0) {
        data.errors = { existing : { nouser : 'The email is not registered! Please register.' } };
        render("login.ejs", data);
        return;
    }
  
    
    const userObj = existingUsers.rowsOfObjects()[0];
    const hash = userObj.password;
    const existingUser = await checkuser(data.email);
    
    const passwordCorrect = await bcrypt.compare(data.password, hash);
    if (!passwordCorrect || existingUser.rowCount === 0) {
        data.errors = { password : { pwerror : 'Invalid email or password! Please try again.' } };
        render("login.ejs", data);
        return;
    }
  
    setSession({session:session},userObj);
    data.success = 'Successful authentication';
    render("login.ejs", data);
};

const getLogoutForm = async({request, response, render, session}) => {
    if (request) {
        clean({session:session});
        response.redirect('/auth/login');
        await showLoginForm({render:render});
    }
};


export { registrationform, registrationform1, showLoginForm, loginform1, getLogoutForm, loginredirect };