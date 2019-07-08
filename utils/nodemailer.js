const nodemailer=require("nodemailer");
//const roleRightsOps=require("../helpers/roleRightsCrud");

function sendEmails(sub,msg,rec,resp,cb){  // console.log(sub,msg,rec);
    nodemailer.createTestAccount((err,acc)=>{
        if(err)resp.status(500).json({"message":"Error in creating test account","error":err});
        var trans=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"YOUR USERNAME",
                pass:"YOUR PASSWORD"
            }
        });
        var mailOptions={
            from:"YOUR USERNAME",
            to:rec,
            subject:sub,
            html:msg
        };
        trans.sendMail(mailOptions).then(function(info){
            //console.log("success"); 
            if(cb)cb(resp);
            else{
                if(resp){resp.status(200).json({"message":"Mail(s) sent", info:info});}
            }
        }).catch(function(err){//rollback required
            if(resp)resp.status(500).json({"message":"cant send mail: ",err});
            else console.log(err); //winston
        });
    })

}
module.exports=sendEmails;

