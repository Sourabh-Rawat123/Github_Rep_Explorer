// this utitility is used to handle async errors when 
const Async_handler=(Request_handler)=>{
   return (req,res,next)=>{
     // promise .resolve because request handler returns a prmise and any error can be caught by catch block
      Promise.resolve(Request_handler(req,res,next)).catch((err)=>next(err));
    }
}
module.exports=Async_handler;