 const {connect} =require("mongoose")

 module.exports= ()=> {
    connect(process.env.MONGODB
      // ,{useNewUrlParser:true, useUnifiedTopology:true}
      )
    .then(()=>console.log("--DB Connected--"))
    .catch((err)=>console.log("DB Can Not Connected",err.message))
 }