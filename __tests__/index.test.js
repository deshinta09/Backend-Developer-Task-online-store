if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const request = require('supertest')
let phone = require('../data/phone.json')
let user = require('../data/user.json')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize, User, Phone } = require('../models')
const { createToken } = require('../helpers/jsonwebtoken')
const app = require('../app')

let tokenAdmin;
let tokenCustomer;

beforeAll(async()=>{
    try {
        user = user.map(el=> {
            el.createdAt = el.updatedAt = new Date()
            el.password = hashPassword(el.password)
            return el 
           })
           await sequelize.queryInterface.bulkInsert('Users', user, {})
           const admin = await User.create(
               {
                   "email": "user4@example.com",
                   "username": "user4",
                   "password": "secret",
                   "role": "admin"
               }
           )
           tokenAdmin = createToken({id:admin.id})
           const customer = await User.create(
               {
                   "email": "user5@example.com",
                   "username": "user5",
                   "password": "secret",
                   "role": "customer"
               }
           )
           tokenCustomer = createToken({id:customer.id})
           
           phone = phone.map(el=>{
            el.createdAt = el.updatedAt = new Date()
            return el
          })
           await sequelize.queryInterface.bulkInsert('Phones', phone, {})
    } catch (error) {
        console.log(error,'<< error before all');
    }
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Phones', null, {truncate: true, cascade: true, restartIdentity: true})
    await sequelize.queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true})
})

describe('POST /login', ()=>{
    test('should response 200 - ok', async()=>{
        let user = {
            "email": "user4@example.com",
            "password": "secret"
        }

        let response = await request(app).post('/login').send(user)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    // error tanpa password
    test('should response 400 - Bad Request', async()=>{
        let user = {
            "email": "user4@example.com",
            "password": ""
        }

        let response = await request(app).post('/login').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Input')
    })
    
    // error tanpa email
    test('should response 400 - Bad Request', async()=>{
        let user = {
            "email": "",
            "password": "secret"
        }

        let response = await request(app).post('/login').send(user)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Input')
    })

    // error email salah
    test('should response 401 - Unauthorize', async()=>{
        let user = {
            "email": "user123@example.com",
            "password": "secret"
        }

        let response = await request(app).post('/login').send(user)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid email/password')
    })

    // error password salah
    test('should response 400 - Unauthorize', async()=>{
        let user = {
            "email": "user4@example.com",
            "password": "password salah"
        }

        let response = await request(app).post('/login').send(user)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid email/password')
    })
})

describe('POST /register', ()=>{
    test('shoukd respnse 201 - ok', async()=>{
        let newUser = {
            "email": "user12@example.com",
            "username": "user12",
            "password": "securepass",
            "role": "admin"
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("username", newUser.username)
        expect(response.body).toHaveProperty("email", newUser.email)
        expect(response.body).toHaveProperty("role", newUser.role)
    })

    // error tanpa email
    test('shoukd respnse 400 - Bad Request', async()=>{
        let newUser = {
            "username": "user 6",
            "email": "user5@example.com",
            "password": "secret",
            "role": "admin"
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email must be unique")
    })

    // error email sudah ada
    test('shoukd respnse 400 - Bad Request', async()=>{
        let newUser = {
            "username": "user 6",
            "email": null,
            "password": "secret",
            "role": "admin"
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email is require")
    })

    // error format email salah
    test('shoukd respnse 400 - Bad Request', async()=>{
        let newUser = {
            "username": "user 6",
            "email": "user12examplecom",
            "password": "secret",
            "role": "admin"
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email must be type email")
    })

    // error tanpa password
    test('shoukd respnse 400 - Bad Request', async()=>{
        let newUser = {
            "username": "user 6",
            "email": "user6@example.com",
            "password": "",
            "role": "admin"
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Password is require")
    })

    // error tanpa role
    test('shoukd respnse 400 - Bad Request', async()=>{
        let newUser = {
            "username": "user 6",
            "email": "user6@example.com",
            "password": "secret",
            "role": ""
        }
        let response = await request(app).post('/register').send(newUser)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Role is require")
    })
})

describe('GET /phones', ()=>{
    test('should response 200 - ok', async()=>{
        let response = await request(app).get('/phones').set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body[0]).toHaveProperty("name", expect.any(String))
        expect(response.body[0]).toHaveProperty("type", expect.any(String))
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number))
        expect(response.body[0]).toHaveProperty("AuthorId", expect.any(Number))
        expect(response.body[0]).toHaveProperty("description", expect.any(String))
    })
})

describe('POST /phones', ()=>{
    test('should response 201 - ok', async()=>{
        let phone = {
            "name": "iPhone 13",
            "type": "Smartphone",
            "stock": 50,
            "description": "The latest iPhone model with advanced features."
          }
        let response = await request(app).post('/phones').send(phone).set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", phone.name)
        expect(response.body).toHaveProperty("type", phone.type)
        expect(response.body).toHaveProperty("stock", phone.stock)
        expect(response.body).toHaveProperty("AuthorId", 4)
        expect(response.body).toHaveProperty("description", phone.description)
    })

    // error user role customer melihat
    test('should response 403 - Forbidden', async()=>{

        let response = await request(app).get('/phones').set('authorization', `Bearer ${tokenCustomer}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "You are not authorize")
    })
})

describe('PUT /phones/:id', ()=>{
    test('should response 201 - ok', async()=>{
        let phone = {
            "name": "iPhone 13",
            "type": "Smartphone",
            "stock": 50,
            "description": "The latest iPhone model with advanced features."
          }

        let findPhone = await Phone.findByPk(3)
        let response = await request(app).put('/phones/'+3).send(phone).set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", `Phone ${findPhone.name} success to update`)
    })

    // error phone tdk ditemukan
    test('should response 404 - Phone not found', async()=>{
        let phone = {
            "name": "iPhone 13",
            "type": "Smartphone",
            "stock": 50,
            "description": "The latest iPhone model with advanced features."
          }

        let response = await request(app).put('/phones/'+30).send(phone).set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Phone not found")
    })

    // error user role customer mengupdate
    test('should response 403 - Forbidden', async()=>{
        let phone = {
            "name": "iPhone 13",
            "type": "Smartphone",
            "stock": 50,
            "description": "The latest iPhone model with advanced features."
          }

        let response = await request(app).put('/phones/'+3).send(phone).set('authorization', `Bearer ${tokenCustomer}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "You are not authorize")
    })
})

describe('DELETE /phones/:id', ()=>{
    test('should response 201 - ok', async()=>{
        let findPhone = await Phone.findByPk(3)
        let response = await request(app).delete('/phones/'+3).set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", `Phone ${findPhone.name} success to delete`)
    })

    // error data tdk ditemukan
    test('should response 404 - Phone not found', async()=>{
        let response = await request(app).delete('/phones/'+3).set('authorization', `Bearer ${tokenAdmin}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Phone not found")
    })

    // error user role customer mendelete
    test('should response 403 - Forbidden', async()=>{

        let response = await request(app).put('/phones/'+4).set('authorization', `Bearer ${tokenCustomer}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "You are not authorize")
    })
})