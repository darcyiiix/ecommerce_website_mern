import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        allowedCoordinates: {
            lat: 31.408128,
            lon: 74.219520,
        }
    },

    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        allowedCoordinates: {
            lat: 31.408128,
            lon: 74.219520,
        },
    },

    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        allowedCoordinates: {
            lat: 31.408128,
            lon: 74.219520,
        },
    },
];

export default users;