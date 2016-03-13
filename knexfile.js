module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/breaking_it_apart'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
