const Bitstamp = require('bitstamp-ws');

const soc = new Bitstamp({ order_book: false, diff_order_book: false, live_trades: true });

module.exports = (io) => {
  soc.on('trade', (trade) => {
    trade.timestamp = Date.now() / 1000;
    let data = {
      provider: 'bitstamp',
      volume: trade.amount,
      tid: trade.id,
      timestamp: trade.timestamp,
      close: trade.price,
      symbol: 'USD'
    };

    console.log(data)
    io.emit('market data', data);
  });
};
