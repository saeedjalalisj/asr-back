import client, { Connection } from 'amqplib'
import { rabbitmqConfig } from "../../../../config/rabbitmq";
import EventEmitter from "events";

export class Rabbitmq {
    private static _instance;
    public assertQueue = null;
    public channel = null;
    public connect: Promise<Connection>;

    constructor() {
        this.connect = client.connect(
            `amqp://${rabbitmqConfig.username}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`
        );
    }

    public static async getInstance(): Promise<Rabbitmq> {
        if (!Rabbitmq._instance) {
            Rabbitmq._instance = new Rabbitmq();
            await Rabbitmq._instance.init();
        }
        return Rabbitmq._instance;
    }

    private async init(): Promise<void> {
        const rabbitConn = await this.connect;
        if (!this.channel) {
            this.channel = await rabbitConn.createChannel();
            this.channel.responseEmitter = new EventEmitter();
            this.channel.responseEmitter.setMaxListeners(0);
        }
        if (!this.assertQueue) {
            this.assertQueue = await this.channel.assertQueue("", { exclusive: true});
        }
    }

    public async sendMessage(msg: any, correlationId: string): Promise<any> {
        await this.channel.sendToQueue(rabbitmqConfig.queue, Buffer.from(JSON.stringify(msg)), {
            correlationId: correlationId,
            replyTo: this.assertQueue.queue
        });
        await this.channel.consume(this.assertQueue.queue, (msg) => {
            this.channel.responseEmitter.emit("data", msg)
        }, { noAck: true });
    }
}