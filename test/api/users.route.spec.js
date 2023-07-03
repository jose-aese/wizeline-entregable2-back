const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/user.model');

describe('Pruebas sobre la API de users', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/mean');
    });

    afterAll(async () => {
       await mongoose.disconnect();
    });


    describe('POST /api/users', () => {
        const newUser = {
            name:'jose',
            surname:'perez',
            nick:'joseaeseUsers',
            email:'enrhiqueUsers@gmail.com',
            password:'jose1234',
        }

        const userEmail = {
            name:'jose',
            surname:'perez',
            nick:'joseaeseUsersEmail',
            email:'enrhiqueUsers@jorysb',
            password:'jose1234',
        }
        const wrongUser =  {
            nombre:'jose'
        }
        let response;

        beforeEach(async () => {
            response =  await request(app).post('/api/users').send(newUser);
        });


        afterEach(async () => {
            await User.deleteMany({name:'jose'});
        });
        it('La ruta funcione', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se inserta correctamente ', async () => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newUser.name);
            expect(response.body.role).toBe('user');
        });

        it('Error en el email ', async () => {
            const responseErrEmail = await request(app).post('/api/users').send(userEmail);
            expect(responseErrEmail.status).toBe(400);
        });

        it('Error en la inseccion', async () => {
            const responseErr = await request(app).post('/api/users').send(wrongUser);
            expect(responseErr.status).toBe(500);
            expect(responseErr.body.error).toBeDefined();
        });

    });


    /*

    describe('GET /api/users', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/users').send();
        });

        it('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La peticion nos devuelve un array de users', async () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });



    describe('PUT /api/users', () => {
        let user;
        let response;
        beforeEach(async () => {
            user = await User.create({
                name:'jose',
                surname:'perez',
                nick:'joseaese',
                email:'enrhique50',
                password:'jose1234',
            });

            response = await request(app).put(`/api/users/${user._id}`).send({
                name : 'Jose Juan'
            });
        });

        afterEach(async () => {
            await User.findByIdAndDelete(user.:id);
        });

        it('La ruta funciona', async ()  => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se actualiza correctamente', async ()  => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('Jose Juan');
        });
    })

    describe('DELETE /api/users', () => {
        let user;
        let response;
        beforeEach(async  () => {
           user = await User.create({
                name:'jose',
                surname:'perez',
                nick:'joseaese',
                email:'enrhique50',
                password:'jose1234',

           });
            response = await request(app).delete(`/api/users/${user._id}`).send();
        });

        it('La ruta funcione', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Borra correctamente', async () => {
            expect(response.body._id).toBeDefined();

            const foundUser = await User.findById(user._id);
            expect(foundUser).toBeNull();

        });

    })

     */

});
