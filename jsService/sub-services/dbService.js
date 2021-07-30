function applyDB(pkgInfo,service,dbname){
    service.register("createDB",function(message){
        const query={"query": {"from":dbname}};
        const kind={ 
            "id":dbname,
            "owner":pkgInfo.name,
            "schema":{
                "type":"object",
                "properties":{
                    "start":{
                        "type":"date"
                    },
                    "end":{
                        "type":"date"
                    },
                    "content":{
                        "type":"string"
                    },
                    "notice":{
                        "type":"number"
                    },
                    "device":{
                        "type":"object"
                    }
                }
            },
            "indexes":[
                {"name":"start","props":[{"name":"start"}]},
                {"name":"end","props":[{"name":"end"}]},
                {"name":"content","props":[{"name":"content"}]},
                {"name":"notice","props":[{"name":"notice"}]},
                {"name":"device","props":[{"name":"device"}]}
            ]
        };
        const permission={ 
            "permissions":[ 
               { 
                  "operations":{ 
                     "read":"allow",
                     "create":"allow",
                     "update":"allow",
                     "delete":"allow"
                  },
                  "object":dbname,
                  "type":"db.kind",
                  "caller":pkgInfo.name
               }
            ]
        };
    
        service.call(service_name+'find',query ,function(reply){
            if(reply.payload.returnValue){
                message.respond({msg:"already exists"});
            }
            else{
                service.call(service_name+'putKind',kind,function(reply){
                    message.respond({msg:"create kind"})
                })
            }
        })
    
        service.call(service_name+'putPermission',permission)
    });
    
    service.register("enrollEvent",function(message){
        const start_time=new Date(message.payload.startTime);
        const end_time=new Date(message.payload.endTime);
        const kind_object={
            "objects":[ 
              { 
                 "_kind":dbname,
                 "startTime":start_time,
                 "endTime":end_time,
                 "repeat":message.payload.repeat,
                 "content":message.payload.content
            }
        ]}
    
        service.call(service_name+'put',kind_object);
    });
    
    service.register("ListEvent",function(message){
        const start_time=new Date(message.payload.startTime);
        const end_time=new Date(message.payload.endTime);
        const query={
            "query": {
                "from":"com.webos.service.event:1",
                "where":[
                    {"prop":"startTime",
                    "op":">=",
                    "val":start_time}
                ],
                "where":[
                    {"prop":"endTime",
                    "op":"<=",
                    "val":end_time}
                ]
            }
        };
        service.call(service_name+'find',query);
    });
}

module.exports = {applyDB};