const schedule = require('node-schedule');
const fs = require('fs');
const encode = 'utf8';
let defaultpath;
let eventList={};

export function initEventModule(job_daystarter,path){
    defaultpath = path+'/EventData1.json';
    eventList = readEventData(date);
    eventList.forEach(i=>{
        addJobs(index);
    })
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

function readEventData(){
    try{
        const eventFile = fs.readFileSync(defaultpath,encode);
        return JSON.parse(eventFile);
    }catch(e){
        fs.writeFileSync(defaultpath, {}, {
            encoding: encode,
            flag: 'w',
        });
        return {};
    }
};

function addJobs(index){

}
function delJob(index){

}

export function getEventlist(){
    eventList = readEventData();
    return eventList;
}

export function delEvent(eventID){
    eventlist[eventID] = null;
    try{
        fs.writeFileSync(defaultpath, eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    delJob(index);
    return [eventID,true];
}

export function addEvent(eventInfo){
    let index = Object.keys(eventlist).length;

    eventlist[index] = eventInfo;

    try{
        fs.writeFileSync(defaultpath, eventlist, {
            encoding: encode,
            flag: 'w',
        });
    }catch(e){
        return [e.toString(),false];
    }
    addJobs(index);
    return [index,true];
}

