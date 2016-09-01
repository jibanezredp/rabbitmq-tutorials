const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'worker-q';
    const msg = process.argv.slice(2).join(' ') || 'Hello World';

    ch.assertQueue(q, { durable: true });
    ch.sendToQueue(q, Buffer.from(msg), { persistant: true });
    console.log(` [x] Sent [${msg}]`);
  });
  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
