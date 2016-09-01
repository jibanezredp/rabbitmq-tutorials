const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'logs';
    const msg = process.argv.slice(2).join(' ') || 'Hello World';

    ch.assertExchange(ex, 'fanout', { durable: false });
    ch.publish(ex, '', Buffer.from(msg));
    console.log(` [x] Sent [${msg}]`);
  });
  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
