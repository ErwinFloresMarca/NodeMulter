var jwt=require('jsonwebtoken');
var Key="PonerLlaveSecreta";
module.exports.getToken=function(payload){
    TOKEN=null;
    jwt.sign(payload,Key,(err,token)=>{
        Token=token;
    });
    return TOKEN;
}

module.exports.verifyToken=(req, res, next)=> {
    //Recuperar el header
    const header = req.headers["authorization"];
    if (header  == undefined) {
        res.status(403).json({
          msn: "No autotizado"
        })
    } else {
        req.token = header.split(" ")[1];
        jwt.verify(req.token, Key, (err, authData) => {
          if (err) {
            res.status(403).json({
              msn: "No autotizado"
            });
          } else {
              //verificacion de algun rol
            next();
          }
        });
    }
  }