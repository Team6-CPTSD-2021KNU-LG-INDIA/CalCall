const schedule = require('node-schedule');
const fs = require('fs');
const encode = 'utf8';
let defaultpath;

let joblist=[];
let today = null;

export function initEventModule(job_daystarter,path){
    defaultpath = path;
    today = new Date();
    job_daystarter = schedule.scheduleJob('0 0 0 * * *',function(){
        today = new Date();
    });
}

export class eventInfo{
    constructor(device_id, action_id, contents, start, end){
        this.device_id = device_id;
        this.action_id = action_id;
        this.contents = contents;
        this.start = start;
        this.end = end;
    }
}
export class JobInfo{
    constructor(eventId){
        this.eventId = eventId;
    }
}

function makeFileStr(date){
    return `${defaultpath}/${date.getUTCFullYear}_${date.getUTCMonth}_${date.getUTCDate}.json`;
}

function readEventData(date){
    const eventFile = fs.readFileSync(makeFileStr(date),encode);
     
    return JSON.parse(eventFile);
};

function applyJobs(){

}

export function makeHourstr(date){
    let t = new Date();
    return `${date.getUTCHours()}_${date.getUTCMinutes()}_${date.getUTCSeconds()}`;
}

export function getEventlist(start,end){

    return eventlist;
}

export function delEvent(eventID,date){
    let eventlist = readEventData(date);

    eventlist[eventID] = null;

    try{
        fs.writeFileSync(makeFileStr(date), eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    if (date === today){
        applyJobs()
    }
    return [eventID,true];
}

export function addEvent(eventInfo,date){
    let eventlist = readEventData(date);

    let index = Object.keys(eventlist).length;

    eventlist[index] = eventInfo;

    try{
        fs.writeFileSync(makeFileStr(date), eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    if (date === today){
        applyJobs()
    }
    return [index,true];
}

