const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'worker-q';

    ch.assertQueue(q, { durable: true });
    console.log(` [*] Waiting for messages in ${q}. To exit press CTRL+C`);
    ch.consume(q, msg => {
      console.log(` [x] Received ${msg.content.toString()}`);

      const secs = msg.content.toString().split('.').length - 1;
      setTimeout(() => {
        console.log(` [x] ${msg.content.toString()} done`);
        ch.ack(msg);
      }, secs * 1000);
    }, { noAck: false });
  });
});
