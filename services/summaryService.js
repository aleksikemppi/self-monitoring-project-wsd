import { executeQuery, executeCachedQuery } from "../database/database.js"; 

const week = async (dt) => {
     var tdt = new Date(dt.valueOf());
     var dayn = (dt.getDay() + 6) % 7;
     tdt.setDate(tdt.getDate() - dayn + 3);
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return [dt.getFullYear(), 1 + Math.ceil((firstThursday - tdt) / 604800000)];
};

const month1 = async () => {
    var today = new Date();
    var kk1 = String(today.getMonth()).padStart(2, '0');
    var vuos1 = today.getFullYear();
    if (kk1 === '01') {
        kk1 = '12';
        vuos1 = (Number(vuos1) - 1).toString();
    }
    let Month = vuos1 + '-' + kk1;
    return Month;
};

Date.prototype.week = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

function rangweek(weekNo, vuos) {
    var a, numod, fromto, andto;
    a = new Date(''+vuos+'');
    numod = a.getDay() - 1;
    a.setDate(a.getDate() - numod);
    a.setDate(a.getDate() + (7 * (weekNo - a.week())));
    fromto = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
    a.setDate(a.getDate() + 7);
    andto = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
    return [fromto, andto];
};

const timespend = async ({request, session}) => {
    var myDate=new Date();
    let Week = await week(myDate);
    let lastmonth = await month1();
    let lastweek = '';
    if (Week[1] ===  53 ) {
        Week[0] = Week[0] - 1;
    }
    if (Week[1] === 1) {
        myDate.setDate(myDate.getDate()-7)
        let Week = await week(myDate);
        lastweek = String(Week[0]-1)+'-W'+String(Week[1]);
    } else {
        lastweek = String(Week[0])+'-W'+String(Week[1]-1).padStart(2, '0');
    }
    const data = {
        week: lastweek,
        month: lastmonth,
        weekrange: rangweek(Number(lastweek.substring(6,8)), Number(lastweek.substring(0,4))),
        monthrange: rangmonth(Number(lastmonth.substring(5,7)-1), Number(lastweek.substring(0,4)))
    }
   
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.week = params.get("week");
      data.month = params.get("month");
      data.weekrange = rangweek(Number(data.week.substring(6,8)), Number(data.week.substring(0,4)));
      data.monthrange = rangmonth(Number(data.month.substring(5,7)-1), Number(data.month.substring(0,4)));
      }
    return data;
  };

  const weekdata = async (weekrange, userID) => {
   const Avg = await executeCachedQuery("SELECT round(AVG(sleepduration)::numeric,1) as avg1, round(AVG(sporttime)::numeric,1) as avg2, round(AVG(studytime)::numeric,1) as avg3, round(AVG(sleepquality)::numeric,1) as avg4, round(AVG((mgenericmood+mgenericmood)/2)::numeric,1) as avg5 FROM reports WHERE date BETWEEN $1 AND $2 AND user_id=$3;", weekrange[0], weekrange[1], userID);
   const data = {
    avg1: Avg.rowsOfObjects()[0].avg1,
    avg2: Avg.rowsOfObjects()[0].avg2,
    avg3: Avg.rowsOfObjects()[0].avg3,
    avg4: Avg.rowsOfObjects()[0].avg4,
    avg5: Avg.rowsOfObjects()[0].avg5,
    nodataw: null
   }
   if (Avg.rowsOfObjects()[0].avg1 === null) {
    data.avg1 = 0;
    data.avg2 = 0;
    data.avg3 = 0;
    data.avg4 = 0;
    data.avg5 = 0;
    data.nodataw = 'No data for that week!';
}
    return data;
};

const monthdata = async (monthrange, userID) => {
   const Avg = await executeCachedQuery("SELECT round(AVG(sleepduration)::numeric,1) as avg6, round(AVG(sporttime)::numeric,1) as avg7, round(AVG(studytime)::numeric,1) as avg8, round(AVG(sleepquality)::numeric,1) as avg9, round(AVG((mgenericmood+mgenericmood)/2)::numeric,1) as avg10 FROM reports WHERE date BETWEEN $1 AND $2 AND user_id=$3;", monthrange[0], monthrange[1], userID);
   const data = {
    avg6: Avg.rowsOfObjects()[0].avg6,
    avg7: Avg.rowsOfObjects()[0].avg7,
    avg8: Avg.rowsOfObjects()[0].avg8,
    avg9: Avg.rowsOfObjects()[0].avg9,
    avg10: Avg.rowsOfObjects()[0].avg10,
    nomw: null
   }
   if (Avg.rowsOfObjects()[0].avg6 === null) {
    data.avg6 = 0;
    data.avg7 = 0;
    data.avg8 = 0;
    data.avg9 = 0;
    data.avg10 = 0;
    data.nomw = 'No data';
}
   return data;
};

const usersdata = async () => {
    const Avg = await executeCachedQuery("SELECT user_id, round(AVG(sleepduration)::numeric,1) as AvgSleepDuration, round(AVG(sporttime)::numeric,1) as AvgTimeOnSportAndExercise, round(AVG(studytime)::numeric,1) as AvgTimeOnStudy, round(AVG(sleepquality)::numeric,1) as AvgSleepQuality, round(AVG((mgenericmood+mgenericmood)/2)::numeric,1) as AvgGenericMood FROM reports WHERE date BETWEEN ( SELECT now( ) - INTERVAL '7 day' ) AND ( SELECT now( ) ) GROUP BY user_id");
   const data = {
       allusersdata : Avg.rowsOfObjects()
   }
    return data;
};

function rangmonth(monthNo, vuos) {
    var formatted_date = function(date){
        var kk = ("0"+ (date.getMonth()+1)).slice(-2); 
        var paiva = ("0"+ date.getDate()).slice(-2); 
        var vuos = date.getFullYear();
        return  vuos +'-'+kk+'-'+paiva; 
    }    
        var first_day = new Date(vuos, monthNo, 1); 
        var last_day = new Date(vuos, monthNo + 1 , 0);    
        var month_start_date =formatted_date(first_day);   
        var month_end_date =formatted_date(last_day);
        return [month_start_date, month_end_date];
    };   

const daydata = async ({params}) => {
    const date = String(params.year) + '-' + String(params.month) + '-' + String(params.day);
    const Day = await executeCachedQuery("SELECT substring(date::varchar from 1 for 10) as date, user_id, sleepduration as AvgSleepDuration, sporttime as AvgTimeOnSportAndExercise, studytime as AvgTimeOnStudy, sleepquality as AvgSleepQuality, (mgenericmood+mgenericmood)/2 as AvgGenericMood FROM reports WHERE date=$1",date);
    const data = {
       daydata : Day.rowsOfObjects()
   }
    return data;
};

export { timespend, weekdata, monthdata, usersdata, daydata };