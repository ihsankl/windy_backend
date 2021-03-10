import app from 'express'
import { formidableConfig } from '../config/config.js'
import { getUsers, getDetailUser, addUser, updateUser, delUser } from '../model/user.js'
const router = app.Router()

formidableConfig(router, './src/images/user')

// GET ALL USERS
router.get('/', async (req, res) => {
    const result = await getUsers()
    res.send(result)
})

// GET DETAIL USER
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await getDetailUser(id)
    res.send(result)
})

// ADD USER
router.post('/register', async (req, res) => {
    const data = req
    const result = await addUser(data)
    res.send(result)
})

// UPDATE USER
router.put('/:id', async (req, res) => {
    const data = req
    const { id } = req.params
    const result = await updateUser(data, id)
    res.send(result)
})

// DELETE USER
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await delUser(id)
    res.send(result)
})

// Login
// router.post('/', (req, res) => {
//     const { username, password } = req.body

//     mysql.execute(login, [username], (err, result) => {
//         if (result.length > 0) {
//             if (bcrypt.compareSync(password, result[0].password)) {
//                 const id = result[0].id
//                 const roles = result[0].role_id
//                 const auth = jwt.sign({ username, id, roles }, process.env.APP_KEY)
//                 const token = auth
//                 const is_revoked = 0
//                 const created_on = new Date()
//                 const updated_on = new Date()
//                 const revoked = `INSERT INTO revoked_token (token,is_revoked,created_on,updated_on) VALUES (?,?,?,?)`
//                 mysql.execute(revoked, [token, is_revoked, created_on, updated_on], (err1, result1, field) => {
//                     res.send({
//                         succes: true,
//                         auth
//                     })
//                 })
//             } else {
//                 res.send({
//                     succes: false,
//                     msg: "Incorret Password"
//                 })
//             }
//         } else {
//             res.send({
//                 succes: false,
//                 msg: "Username Not Found"
//             })
//         }
//     })

// })


/**Log Out */
// router.get('/', auth, (req, res) => {
//     const token = req.headers.auth_token
//     mysql.execute(logout, [1, token], (err, result, field) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send({ success: true, data: result, msg: "Log Out Success" })
//         }
//     })
// })


/* detail user */
// router.get('/:id', (req, res) => {
//     const { id } = req.params

//     mysql.execute(detail, [id], (err, result, field) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send({ succes: true, data: result[0] })
//         }
//     })
// })

/** delete user */
// router.delete('/:id', (req, res) => {
//     const { id } = req.params
//     mysql.execute(dlt, [id], (err, result, field) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send({ succes: true, data: result })
//         }
//     })
// })

/**edit user */
// router.put('/:id', auth, upload.single('image'), (req, res) => {
//     const { id } = req.params
//     const { title_id, username, first_name, last_name, phone_number, email, password } = req.body
//     const image = (req.file.originalname)
//     const enc_pass = bcrypt.hashSync(password)
//     const updated_on = new Date()

//     mysql.execute(
//         edit, [title_id, username, first_name, last_name, phone_number, email, enc_pass, image, updated_on, id], (err, result, field) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 res.send({ succes: true, data: result })
//             }
//         }
//     )
// })

export default router