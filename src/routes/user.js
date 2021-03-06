require('dotenv').config()

const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mysql = require('../resources/config')
const auth = require('../resources/middleware')
const {login,detail,register,dlt,edit, logout} = require('../model/user')

/**Upload Foto/File */
const multer = require('multer')
const storage = multer.diskStorage({destination: function(req,file,cb){
    cb(null, './src/images/user')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})
const fileFilter = (req,file,cb)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({storage:storage, fileFilter:fileFilter})


// Register User
router.post('/register',upload.single('image'),(req,res)=>{
    const {title_id, username, first_name, last_name, phone_number, email, password} = req.body
    const image = (req.file.originalname)
    const enc_pass = bcrypt.hashSync(password)
    const created_on = new Date()
    const updated_on = new Date()

    mysql.execute(register,[title_id, username, first_name, last_name, phone_number, email, enc_pass, image, created_on, updated_on], (err,result)=>{
        res.send({succsess:true, data:result})
        console.log(err)
    })
})

// Login
router.post('/',(req,res)=>{
    const {username, password} = req.body

    mysql.execute(login,[username], (err,result)=>{
        if(result.length>0){
            if(bcrypt.compareSync(password,result[0].password)){
            const id = result[0].id
            const roles = result[0].role_id
            const auth = jwt.sign({username, id, roles},process.env.APP_KEY)
            const token = auth
            const is_revoked = 0
            const created_on = new Date()
            const updated_on = new Date()
            const revoked = `INSERT INTO revoked_token (token,is_revoked,created_on,updated_on) VALUES (?,?,?,?)`
            mysql.execute(revoked,[token,is_revoked,created_on,updated_on], (err1,result1,field)=>{
            res.send({
                succes: true,
                auth
            })
        })
            }else{
                res.send({
                    succes:false,
                    msg : "Incorret Password"
                })
            }
        }else{
            res.send({
                succes:false,
                msg : "Username Not Found"
            })
        }
    })

})


/**Log Out */
router.get('/',auth,(req,res)=>{
    const token = req.headers.auth_token
    mysql.execute(logout, [1, token],(err,result,field)=>{
        if(err){
            console.log(err)
        }else{
            res.send({success: true, data:result, msg: "Log Out Success"})
        }
    })
})


/* detail user */
router.get('/:id',auth,(req,res)=>{
    const {id} = req.params

    mysql.execute(detail,[id], (err, result,field)=>{
        if(err){
            console.log(err)
        }else{
            res.send({succes:true,data:result[0]})
        }
        })
})

/** delete user */
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    mysql.execute(dlt,[id], (err,result,field)=>{
        if(err){
            console.log(err)
        }else{
            res.send({succes:true,data:result})
        }
    })
})

/**edit user */
router.put('/:id',auth,upload.single('image'),(req,res)=>{
    const {id} = req.params
    const{title_id, username, first_name, last_name, phone_number, email, password} = req.body
    const image = (req.file.originalname)
    const enc_pass = bcrypt.hashSync(password)
    const updated_on = new Date()

    mysql.execute(
        edit,[title_id, username, first_name, last_name, phone_number, email, enc_pass, image, updated_on,id],(err,result,field)=>{
            if(err){
                console.log(err)
            }else{
                res.send({succes:true,data:result})
            }
        }
    ) 
})


module.exports = router 