import app from '../../src/app.js';
import request from 'supertest';
import { fakerES as faker } from '@faker-js/faker'; 

const doc = {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alphanumeric(5),
    price: faker.number.int(10000),
    status: faker.datatype.boolean(),
    stock: faker.number.int(100),
    category: faker.commerce.department(),
    thumbnails: [faker.image.url()],
  };

  const userData = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.exampleEmail(),
    password: 'password123',
    age: faker.number.int(100),
  };


describe('Testing Integral Del Proyecto', () => {

  describe('TEST DE PRODUCTOS', () => {

    let authCookie;
    
    beforeAll(async () => {
        const authResponse = await request(app).post("/api/users/login").send({
            email: "ana@gmail.com",
            password: "1234",
        });
        authCookie = authResponse.headers["set-cookie"][0];
    });

    test('[POST] /api/products | Crear un producto', async () => {
     
      const response = await request(app)
        .post('/api/products')
        .set('Cookie', [authCookie])
        .send(doc);

      const responseBody = response.body;
      const statusCode = response.statusCode;
      
      const expected = {
        title: doc.title,
        description: doc.description,
        code: doc.code,
        price: doc.price,
        status: doc.status,
        stock: doc.stock,
        category: doc.category,
        thumbnails: doc.thumbnails,
      };

      expect(responseBody).toMatchObject(expected);
      expect(response.statusCode).toBe(200);
      expect(statusCode).not.toBe(404);
    });

    test('[GET] /api/products | Obtener todos los productos', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('payload'); 
        expect(Array.isArray(response.body.payload)).toBe(true); 
    });

     test('[GET] /api/products/:id | Obtener producto por su ID', async () => {
    
        const prodId = '6508c76e3f0ddaa861db39ec'; 
        const response = await request(app).get(`/api/products/${prodId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id", prodId);
    }); 
  });

  describe('TEST DE CARRITOS', () => {

    test('[GET] /api/carts/ | Obtener todos los carritos', async () => {
    
        const response = await request(app).get('/api/carts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    }); 

    test('[GET] /api/carts/:id | Obtener carrito por su ID', async () => {

      const cartId = '6508c0a45fcf40068be581bd';

      const response = await request(app).get(`/api/carts/${cartId}`);

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty('_id', cartId);

    });
  
    test('[POST] /api/carts/ | Crear un carrito', async () => {

      const response = await request(app).post('/api/carts/').send({ products: [] });
    
      expect(response.statusCode).toBe(200);
  
      expect(response.body).toHaveProperty('message', 'Carrito creado');

    });
  });
    
    describe('TEST DE SESSIONS', () => {

      let authCookie;
      
      beforeAll(async () => {
        const authResponse = await request(app).post("/api/users/login").send({
            email: "ana@gmail.com",
            password: "1234",
        });
        authCookie = authResponse.headers["set-cookie"][0];
      });

      test('[POST] /api/users/login/ | Loguear un usuario', async () => {
        
        const userCredentials = {
          email: 'ana@gmail.com',
          password: '1234',
        };
      
        const response = await request(app)
          .post('/api/users/login')
          .send(userCredentials);
      
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Login OK');
  
      }); 
  
      test('[POST] /api/users/register | Registrar un usuario', async () => {

        const response = await request(app)
        .post('/api/users/register')
        .send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Register OK');
      });
    
      test('[GET] /api/users/current/ | Obtener datos del usuario logueado', async () => {
  
        const response = await request(app)
        .get('/api/users/current')
        .set('Cookie', [authCookie]);
    
        expect(response.statusCode).toBe(200);
        
        expect(response.body).toEqual({
          'Usuario Actual': {
            Nombre: "Analia",
            Email: "ana@gmail.com",
            Rol: "premium"
          },
        });
      });  
    });
  });

