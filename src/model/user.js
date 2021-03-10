import bcryptjs from 'bcryptjs'
import { query } from '../config/config.js'
import dayjs from 'dayjs'

const getUsers = async () => {
    try {
        const data = await query.select().table('users')
        if (data.length > 0) {
            return { success: true, info: 'Data successfully fetched!', data }
        }
        return { success: true, info: 'No data!', data }
    } catch (error) {
        console.log(error)
        return { success: false, info: 'Something is not right! Check console for detail.', data: error }
    }
}

const getDetailUser = async (id) => {
    try {
        const data = await query.select().table('users').where('id', id)
        if (data.length > 0) {
            return { success: true, info: 'Data successfully fetched!', data }
        }
        return { success: true, info: 'No data!', data }
    } catch (error) {
        console.log(error)
        return { success: false, info: 'Something is not right! Check console for detail.', data: error }
    }
}

const addUser = async (req) => {
    try {
        const { title, username, first_name, last_name, phone_number, email, password } = req.fields
        const image = (req.files)
        const enc_pass = bcryptjs.hashSync(password)
        const created_on = dayjs(new Date()).format('YYYY-MM-DD')
        const updated_on = dayjs(new Date()).format('YYYY-MM-DD')
        const data = {
            title,
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password: enc_pass,
            image: image?.image?.path,
            created_on,
            updated_on,
        }
        await query('users').insert([data])
        return { success: true, info: 'Data successfully created!', data }
    } catch (error) {
        console.log(error)
        return { success: false, info: 'Something is not right! Check console for detail.', data: error }
    }
}

const updateUser = async (req, id) => {
    try {
        const { title, username, first_name, last_name, phone_number, email, password } = req.fields
        const image = (req.files)
        const enc_pass = bcryptjs.hashSync(password)
        const updated_on = dayjs(new Date()).format('YYYY-MM-DD')
        const data = {
            title,
            username,
            first_name,
            last_name,
            phone_number,
            email,
            password: enc_pass,
            image: image?.image?.path,
            updated_on,
        }
        await query('users').update(data).where('id', id)
        return { success: true, info: 'Data successfully updated!', data }
    } catch (error) {
        console.log(error)
        return { success: false, info: 'Something is not right! Check console for detail.', data: error }
    }
}

const delUser = async (id) => {
    try {
        const data = await query.select().table('users').where('id', id)
        await query('users').del().where('id', id)
        return { success: true, info: 'Data successfully deleted!', data }
    } catch (error) {
        console.log(error)
        return { success: false, info: 'Something is not right! Check console for detail.', data: error }
    }
}

export { getUsers, getDetailUser, addUser, updateUser, delUser }