import { Router } from "../deps.js";
import { registrationform, registrationform1, showLoginForm, loginform1, getLogoutForm, loginredirect } from "./controllers/userController.js";
import { reportform, reportform1, mornform, mornform1, nightform, nightform1 } from "./controllers/reportingController.js";
import { summaryform, summaryform1, alluser, daysdata } from "./controllers/summaryController.js";
import { showLandingForm } from "./controllers/landingController.js";

const router = new Router();

router.get('/', loginredirect);
router.get('/auth/registration', registrationform);
router.post('/auth/registration', registrationform1);
router.get('/auth/login', showLoginForm);
router.post('/auth/login', loginform1);
router.get('/auth/logout', getLogoutForm);
router.get('/behavior/reportingmorning', mornform);
router.post('/behavior/reportingmorning', mornform1);
router.get('/behavior/reportingnight', nightform);
router.post('/behavior/reportingnight', nightform1);
router.get('/behavior/reporting', reportform);
router.post('/behavior/reporting', reportform1);
router.get('/behavior/summary', summaryform);
router.post('/behavior/summary', summaryform1);
router.get('/landing', showLandingForm);
router.get('/api/summary', alluser);
router.get('/api/summary/:year/:month/:day', daysdata);

export { router };