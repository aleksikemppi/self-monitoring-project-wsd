import { getinfo } from "../../services/landingService.js";
import { showLoginForm } from "./userController.js";

const showLandingForm = async({render}) => {
        const trendinfo = await getinfo();
        const data = {
            moodt: trendinfo.moodt,
            ymood: trendinfo.ymood,
            ydata: trendinfo.ydata,
            nydata: trendinfo.nydata,
            info: trendinfo.info
        }
        render('landing.ejs', data);
        return;
};

export { showLandingForm };