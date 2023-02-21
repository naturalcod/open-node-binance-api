const OpenBinance = require("open-binance-api");

let OBinance = new OpenBinance("API_KEY", "API_SECRET");


(async () => {

  // Test connectivity to the Rest API.
  let ping = await OBinance.ping();

  // Test connectivity to the Rest API and get the current server time.
  let checkServerTime = await OBinance.ping();

  // Current exchange trading rules and symbol information
  let exchangeInfo = await OBinance.ping();

  // Order Book
  let OrderBook = await OBinance.depth("BTCUSDT");

  // Get recent trades.
  let trades = await OBinance.trades("BTCUSDT");

  // Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
  let aggTrades = await OBinance.aggTrades("BTCUSDT");

  // Kline/candlestick bars for a symbol.
  let klines = await OBinance.klines("BTCUSDT");

  // Current average price for a symbol.
  let avgPrice = await OBinance.avgPrice("BTCUSDT");

  // 24 hour rolling window price change statistics. Careful when accessing this with no symbol.
  let tickerPrice24hr = await OBinance.tickerPrice24hr(["BTCUSDT"]);

  // Latest price for a symbol or symbols.
  let latestPrice = await OBinance.latestPrice(["BTCUSDT"]);

  // Best price/qty on the order book for a symbol or symbols.
  let bookTicker = await OBinance.bookTicker(["BTCUSDT"]);

  // This endpoint is different from the tickerPrice24hr() method.
  let computeStatistics = await OBinance.computeStatistics(["BTCUSDT"]);


})();
