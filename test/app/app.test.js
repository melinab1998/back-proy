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
        const authResponse = await request(app).post("/users/login").send({
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
    
        const prodId = '64f7b818106d8b7c4b15c8e0'; 
        const response = await request(app).get(`/api/products/${prodId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id", prodId);
    }); 
  });

  describe('TEST DE CARRITOS', () => {

    test('[GET] /api/cart/ | Obtener todos los carritos', async () => {
    
        const response = await request(app).get('/api/cart');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    }); 

    test('[GET] /api/cart/:id | Obtener carrito por su ID', async () => {

      const cartId = '64c03f0b035f5664ebd87bb9';

      const response = await request(app).get(`/api/cart/${cartId}`);

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty('_id', cartId);

    });
  
    test('[POST] /api/cart/ | Crear un carrito', async () => {

      const response = await request(app).post('/api/cart/').send({ products: [] });
    
      expect(response.statusCode).toBe(200);
  
      expect(response.body).toHaveProperty('message', 'Carrito creado');

    });
  });
    
    describe('TEST DE SESSIONS', () => {

      let authCookie;
      
      beforeAll(async () => {
        const authResponse = await request(app).post("/users/login").send({
            email: "ana@gmail.com",
            password: "1234",
        });
        authCookie = authResponse.headers["set-cookie"][0];
      });

      test('[POST] /users/login/ | Loguear un usuario', async () => {
        
        const userCredentials = {
          email: 'ana@gmail.com',
          password: '1234',
        };
      
        const response = await request(app)
          .post('/users/login')
          .send(userCredentials);
      
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Login OK');
  
      }); 
  
      test('[POST] /users/register | Registrar un usuario', async () => {

        const response = await request(app)
        .post('/users/register')
        .send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('msg', 'Register OK');
      });
    
      test('[GET] /users/current/ | Obtener datos del usuario logueado', async () => {
  
        const response = await request(app)
        .get('/users/current')
        .set('Cookie', [authCookie]);
    
        expect(response.statusCode).toBe(200);
        
        expect(response.body).toEqual({
          'Usuario Actual': {
            Nombre: "Analia",
            Apellido: "Garavano",
            Rol: "premium"
          },
        });
      });  
    });
  });

