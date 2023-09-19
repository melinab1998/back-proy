export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce Backend Coderhouse',
            version: '1.0.0',
            description: 'Tecnologías utilizadas: Node, Express, MongoDB'
        },
        servers: [
            { url: 'http://localhost:8080' }
        ]
    },
    apis: ['./src/docs/products/products.yml', './src/docs/carts/carts.yml', './src/docs/users/users.yml']
}