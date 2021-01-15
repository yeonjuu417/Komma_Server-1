const dotenv = require('dotenv').config()

module.exports = {
   "type": "mysql",
   "host": process.env.DATABASE_HOST || "localhost",
   "port": process.env.DATABASE_PORT || 3306,
   "username": process.env.DATABASE_USERNAME || "root",
   "password": process.env.DATABASE_PASSWORD || "1234",
   "database":  process.env.DATABASE_NAME || "Komma",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}