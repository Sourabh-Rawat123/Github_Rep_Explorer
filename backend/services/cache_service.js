const cache=require("../utils/cache");
const CACHE_DURATION=60*1000;
const get=(key)=>{
    const cache_item=cache.get(key);

    if(!cache_item){
        return null;
    }
    const isExpired=Date.now()-cache_item.timestamp>CACHE_DURATION;

    if(!isExpired){
        return cache_item.data;
    }
    else{
        cache.delete(key);
        return null;
    }
};
const set=(key,data)=>{
    cache.set(key,{
        data,
        timestamp:Date.now()
    });
}

module.exports={get,set}