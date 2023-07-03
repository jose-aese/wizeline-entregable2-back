const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/user.model');

describe('Pruebas sobre la API de login', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/mean');
        const newUser = {
            name:'joseLogin',
            surname:'perez',
            nick:'joseaese',
            email:'enrhique51@gmail.com',
            password:'jose1234',
        }
        await request(app).post('/api/users').send(newUser);
    });

    afterAll(async () => {
        await User.deleteMany({name:'joseLogin'});
        await mongoose.disconnect();
    });


    describe('POST /api/login', () => {
        const userLogin = {
            nick:'joseaese',
            password:'jose1234',
        }

        const userLoginToken = {
            nick:'joseaese',
            password:'jose1234',
            gettoken:true
        }
        const wrongUser =  {
            nick:'joseaese',
            password:'2341',
        }
        const nonExistent =  {
            nick:'joseaese2',
            password:'2341',
        }
        let user;
        let response;

        beforeEach(async () => {
            response = await request(app).post('/api/login').send(userLogin);
        });

        it('La ruta funcione', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Login correcto', async () => {
            expect(response.body._id).toBeDefined();
        });

        it('Obtener Token', async () => {
            const responseToken= await request(app).post('/api/login').send(userLoginToken);
            expect(responseToken.body.token).toBeDefined();
        });

        it('No existe el usuario', async () => {
            const responseNoExistent = await request(app).post('/api/login').send(nonExistent);
            expect(responseNoExistent.status).toBe(404);
        });

        it('login incorrecto', async () => {
            const responseWrong = await request(app).post('/api/login').send(wrongUser);
            expect(responseWrong.status).toBe(401);
        });
    });
});
