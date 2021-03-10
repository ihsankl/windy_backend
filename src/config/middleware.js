// import jwt from 'jsonwebtoken'
// import mysql from './config(old).js'

// const auth = (req,res,next)=>{
//     if(
//         req.headers['authorization'] &&
//         req.headers['authorization'].startsWith('Bearer')
//         ){
//             const jwt_token = req.headers['authorization'].substr(7)
//             req.headers.auth_token = jwt_token
//             mysql.execute('SELECT token FROM revoked_token WHERE token=? and is_revoked=1',[jwt_token],(err,result,field)=>{
//                 if (err) {
//                     res.send({
//                         success: false,
//                         msg: err
//                     })
//                 }else if (result.length > 0) {
//                     res.send({
//                         success: false,
//                         msg : 'Session Expired'
//                     })
//                 } else {
//             try{
//                 const user = jwt.verify(jwt_token,process.env.APP_KEY)
//                 req.auth = user
//                 next()
//             }catch(e){
//                 res.send({succes:false,msg:e})
//             }
//         }
//     })
//     }else{
//             res.send({succes:false,msg:'You Must be Log In First'})
//         }
// }

// export default auth