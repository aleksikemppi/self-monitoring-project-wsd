import { timespend, weekdata, monthdata, usersdata, daydata } from "../../services/summaryService.js";

const summaryform1 = async({request, render, session}) => {
    if (session && await session.get('authenticated')) {
        const timedata = await timespend({request:request, session: session});
        const userId = (await session.get('user')).id;
        const WeekInfo = await weekdata(timedata.weekrange, userId);
        const MonthInfo = await monthdata(timedata.monthrange, userId);
        const data = {
            email: (await session.get('user')).email,
            week: timedata.week,
            month: timedata.month,
            weekrange: timedata.weekrange,
            monthrange: timedata.monthrange,
            avg1: WeekInfo.avg1,
            avg2: WeekInfo.avg2,
            avg3: WeekInfo.avg3,
            avg4: WeekInfo.avg4,
            avg5: WeekInfo.avg5,
            nodataw: WeekInfo.nodataw,
            avg6: MonthInfo.avg6,
            avg7: MonthInfo.avg7,
            avg8: MonthInfo.avg8,
            avg9: MonthInfo.avg9,
            avg10: MonthInfo.avg10,
            nomw: MonthInfo.nomw
        }
        render('summary.ejs', data);
        return;
    } 
};

const alluser = async({response,render}) => {
    const data = await usersdata();
    response.body = data;
};

const summaryform = async({request, render, session}) => {
    if (session && await session.get('authenticated')) {
        const timedata = await timespend({session: session});
        const userId = (await session.get('user')).id;
        const WeekInfo = await weekdata(timedata.weekrange, userId);
        const MonthInfo = await monthdata(timedata.monthrange, userId);
        const data = {
            email: (await session.get('user')).email,
            week: timedata.week,
            month: timedata.month,
            weekrange: timedata.weekrange,
            monthrange: timedata.monthrange,
            avg1: WeekInfo.avg1,
            avg2: WeekInfo.avg2,
            avg3: WeekInfo.avg3,
            avg4: WeekInfo.avg4,
            avg5: WeekInfo.avg5,
            nodataw: WeekInfo.nodataw,
            avg6: MonthInfo.avg6,
            avg7: MonthInfo.avg7,
            avg8: MonthInfo.avg8,
            avg9: MonthInfo.avg9,
            avg10: MonthInfo.avg10,
            nomw: MonthInfo.nomw
        }
        render('summary.ejs', data);
        return;
    } 
};

const daysdata = async({response,params,render}) => {
    const data = await daydata({params:params});
    response.body = data;
};

export { summaryform, summaryform1, alluser, daysdata };