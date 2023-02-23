const { Client } = require("pg");

require('dotenv').config();

const {
    ASR_DB_USER,
    ASR_DB_PASS,
    ASR_DB_HOST,
    ASR_DB_PORT,
    DB_NAME,
    DB_PASS,
} = process.env;

const client = new Client({
    host: ASR_DB_HOST,
    user: ASR_DB_USER,
    password: ASR_DB_PASS,
    port: ASR_DB_PORT,
});

const createDb = async () => {
    try{
        await client.connect();
        await client.query(`CREATE ROLE ${DB_NAME} LOGIN SUPERUSER PASSWORD '${DB_PASS}';`);
        await client.query(`CREATE DATABASE ${DB_NAME} OWNER ${DB_NAME};`);
        return true;
    } catch (e) {
        console.log("database error when created: ", e);
        return false;
    } finally {
        await client.end();
    }
};

createDb().then((isCreated) => {
    if (isCreated) {
        console.log("created")
    }
});