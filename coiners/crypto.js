const cryptoSocket = require('crypto-socket');

cryptoSocket.start();

module.exports = (io) => {
  setTimeout(() => {
    let data = {};
    const exc = cryptoSocket.Exchanges;
    setInterval(() => {
      data = {
        Bitstamp: exc.bitstamp.BTCUSD || '',
        BitMex: exc.bitmex.BTCUSD || '',
        Bittrex: exc.bittrex.BTCUSD || '',
        Bitfinex: exc.bitfinex.BTCUSD || ''
      };
      io.emit('bitcoin', data);
    }, 1000);

  }, 2000);


};
