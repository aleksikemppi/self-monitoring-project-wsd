import { executeQuery, executeCachedQuery } from "../database/database.js";

const getinfo = async () => {
    const tod = await dayget();
    const nottoday = await day1();
    const daymood = await executeCachedQuery("SELECT (mgenericmood+mgenericmood)/2 AS avgmood FROM reports WHERE date = $1;", tod);
    const ymood = await executeCachedQuery("SELECT (mgenericmood+mgenericmood)/2 AS avgmood FROM reports WHERE date = $1;", nottoday);
    const data = {
        moodt: null,
        ymood: null,
        info: null,
        ydata: null,
        nydata: null
    }
    if (daymood.rowsOfObjects()[0] === undefined) {
        data.ydata = 'No data for today!';
    }
    if (ymood.rowsOfObjects()[0] === undefined) {
        data.nydata = 'No data for yesterday!';
    }
    if (daymood.rowsOfObjects()[0] !== undefined && ymood.rowsOfObjects()[0] !== undefined) {
        data.moodt = Number(daymood.rowsOfObjects()[0].avgmood);
        data.ymood = Number(ymood.rowsOfObjects()[0].avgmood);
        if (data.ymood > data.moodt) {
            data.info = 'Things are looking gloomy today';
        } else if (data.ymood < data.moodt) {
            data.info = 'Things are looking bright today';
        } else {
            data.info = 'Things are looking the same today.'
        }
    }
    return data;
};

const dayget = async () => {
    var tda = new Date();
    var oday = String(tda.getDate()).padStart(2, '0');
    var omonth = String(tda.getMonth() + 1).padStart(2, '0'); 
    var yyear = tda.getFullYear();
    let tod = yyear + '-' + omonth + '-' + oday;
    return tod;
};

const day1 = async () => {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var oday = String(yesterday.getDate()).padStart(2, '0');
    var omonth = String(yesterday.getMonth() + 1).padStart(2, '0'); 
    var yyear = yesterday.getFullYear();
    let nottoday = yyear + '-' + omonth + '-' + oday;
    return nottoday;
};

export { getinfo };