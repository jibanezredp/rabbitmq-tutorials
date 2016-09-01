const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'logs';

    ch.assertExchange(ex, 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      console.log(` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, msg => {
        console.log(` [x] ${msg.content.toString()}`);
      }, { noAck: true });
    });
  });
});
