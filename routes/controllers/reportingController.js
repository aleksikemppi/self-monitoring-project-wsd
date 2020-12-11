import { morningd, morningadd, nightd, nightadd, checkInfo, datefc, getdata, alertMessage } from "../../services/reportingService.js";
import { validate, required, isNumeric, minNumber, maxNumber, isDate, numberBetween } from "../../deps.js";

const morningValidationRules = {
    date: [required, isDate],
};

const nightValidationRules = {
    date: [required, isDate],
    sporttime: [required, isNumeric],
    studytime: [required, isNumeric],
};

const mornform = async({render, session}) => {
    if (session && await session.get('authenticated')) {
        const data = await morningd({session: session});
        render('morning.ejs', data);
    }
};

const mornform1 = async({request, render, session}) => {
    const data = await morningd({request:request, session: session});
    const [passes, errors] = await validate(data, morningValidationRules);

    if (!passes) {
        data.errors = errors;
        render("morning.ejs", data);
        return;
    } else {
        const userId = (await session.get('user')).id;
        morningadd(data, userId);
        data.success = 'Reporting successful!';
        await alertMessage(data.success);
        render("morning.ejs", data);
    }
};

const nightform = async({render, session}) => {
    if (session && await session.get('authenticated')) {
        const data = await nightd({session: session});
        render('night.ejs', data);
    }
};

const reportform = async({request, render, session}) => {
    if (session && await session.get('authenticated')) {
        const data = await getdata({session: session});
        render('reporting.ejs', data);
        return;
    } 
};

const reportform1 = async({request, render, session}) => {
    if (session && await session.get('authenticated')) {
        const data = await getdata({request:request, session: session});
        render('reporting.ejs', data);
        return;
    } 
};

const nightform1 = async({request, response,render, session}) => {
    const data = await nightd({request:request, session: session});
    const [passes, errors] = await validate(data, nightValidationRules);

    if (!passes) {
        data.errors = errors;
        render("night.ejs", data);
        return;
    } else {
        const userId = (await session.get('user')).id;
        nightadd(data, userId);
        data.success = 'Reporting successful!';
        await alertMessage(data.success);
        render("night.ejs", data);
    }
};



export { reportform, reportform1, mornform, mornform1, nightform, nightform1 };