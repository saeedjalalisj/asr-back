const rabbitmqConfig = {
    username: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASS,
    host: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT,
    queue: process.env.RABBIT_QUEUE
};

export {
    rabbitmqConfig
}