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

const deleteDb = async () => {
    try{
        await client.connect();
        await client.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
        await client.query(`DROP ROLE ${DB_NAME}`);
        return true;
    } catch (e) {
        console.log("database error when created: ", e);
        return false;
    } finally {
        await client.end();
    }
};

deleteDb().then((isCreated) => {
    if (isCreated) {
        console.log("deleted")
    }
});