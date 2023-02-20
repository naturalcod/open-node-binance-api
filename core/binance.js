const endpoints = require("../lib/endpoints");
const request = require("request");
const crypto = require("crypto");
const { reqObject, reqObjectPost } = require("../lib/requestObject");
const makeQueryString = require("../lib/makeQueryString");

module.exports = class OpenBinance {
  constructor(api_key, secret_key, options = {}) {
    this.options = {
      APIKEY: api_key,
      APISECRET: secret_key,
      timeOffset: options.timeOffset || 0,
      recvWindow: options.recvWindow || 5000,
    };
  }

  // ----------- Market Data Endpoints ---------

  /**
   * Test connectivity to the Rest API.
   */
  ping() {
    return this.publicRequest(endpoints.base + "v3/ping", {}, "GET");
  }

  /**
   * Test connectivity to the Rest API and get the current server time.
   * @returns { Object }
   */
  checkServerTime() {
    return this.publicRequest(endpoints.base + "v3/time", {}, "GET");
  }

  /**
   * Current exchange trading rules and symbol information
   * Detail https://binance-docs.github.io/apidocs/spot/en/#exchange-information
   * @returns
   */
  exchangeInfo(options = {}) {
    return this.publicRequest(
      endpoints.base + "v3/exchangeInfo",
      options,
      "GET"
    );
  }

  /**
   * Order Book
   * Detail https://binance-docs.github.io/apidocs/spot/en/#order-book
   * @returns
   */
  depth(symbol, limit = 100) {
    return this.publicRequest(
      endpoints.base + "v3/depth",
      { symbol, limit },
      "GET"
    );
  }

  /**
   * Get recent trades.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list
   * @returns
   */
  trades(symbol, limit = 500) {
    return this.publicRequest(
      endpoints.base + "v3/trades",
      { symbol, limit },
      "GET"
    );
  }

  /**
   * Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list
   * @returns
   */
  aggTrades(symbol, options = {}) {
    return this.publicRequest(
      endpoints.base + "v3/aggTrades",
      { symbol, ...options },
      "GET"
    );
  }

  /**
   * Kline/candlestick bars for a symbol.
   * Klines are uniquely identified by their open time.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
   * @returns
   */
  klines(symbol, interval = "1m", options = {}) {
    return this.publicRequest(
      endpoints.base + "v3/klines",
      { symbol, interval, ...options },
      "GET"
    );
  }

  /**
   * Kline/candlestick bars for a symbol.
   * Klines are uniquely identified by their open time.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#uiklines
   * @returns
   */
  UIKlines(symbol, interval = "1m", options = {}) {
    return this.publicRequest(
      endpoints.base + "v3/uiKlines",
      { symbol, interval, ...options },
      "GET"
    );
  }

  /**
   * Kline/candlestick bars for a symbol.
   * Klines are uniquely identified by their open time.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#current-average-price
   * @returns
   */
  avgPrice(symbol, options = {}) {
    return this.publicRequest(
      endpoints.base + "v3/avgPrice",
      { symbol, ...options },
      "GET"
    );
  }

  /**
   * 24 hour rolling window price change statistics. Careful when accessing this with no symbol.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics
   * @returns
   */
  tickerPrice24hr(symbols = ["BTCUSDT"], options = {}) {
    if (typeof symbols === "string") symbols = [symbols];

    return this.publicRequest(
      endpoints.base + "v3/ticker/24hr",
      { symbols: JSON.stringify(symbols), ...options },
      "GET"
    );
  }

  /**
   * Latest price for a symbol or symbols.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker
   * @returns
   */
  latestPrice(symbols = ["BTCUSDT"], options = {}) {
    if (typeof symbols === "string") symbols = [symbols];

    return this.publicRequest(
      endpoints.base + "v3/ticker/price",
      { symbols: JSON.stringify(symbols), ...options },
      "GET"
    );
  }

  /**
   * Best price/qty on the order book for a symbol or symbols.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker
   * @returns
   */
  bookTicker(symbols = ["BTCUSDT"], options = {}) {
    if (typeof symbols === "string") symbols = [symbols];

    return this.publicRequest(
      endpoints.base + "v3/ticker/bookTicker",
      { symbols: JSON.stringify(symbols), ...options },
      "GET"
    );
  }

  /**
   * Note: This endpoint is different from the tickerPrice24hr() method.
   * The window used to compute statistics will be no more than 59999ms from the requested windowSize.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#rolling-window-price-change-statistics
   * @returns
   */
  computeStatistics(symbols = ["BTCUSDT"], windowSize = "1d", options = {}) {
    if (typeof symbols === "string") symbols = [symbols];

    return this.publicRequest(
      endpoints.base + "v3/ticker",
      { symbols: JSON.stringify(symbols), windowSize, ...options },
      "GET"
    );
  }

  // ----------- END Market Data Endpoints ---------

  // ----------- Spot Account/Trade Endpoints ---------

  /**
   * Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.
   * Detail https://binance-docs.github.io/apidocs/spot/en/#test-new-order-trade
   * @param {String} symbol
   * @param {String} side
   * @param {String} type
   * @param {Number} quantity
   * @param {Number} timeInForce
   * @param {Object} options
   * @returns
   */

  testNewOrder(symbol, side, type, quantity, timeInForce, options = {}) {
    if (type === "MARKET" && timeInForce !== undefined) timeInForce = undefined;

    return this.signedRequest(
      endpoints.base + "v3/order/test",
      { symbol, side, type, timeInForce, quantity, ...options },
      "POST"
    );
  }

  /**
   * SPOT : MarketBuy   
   * @param {String} symbol  
   * @param {Number} quantity   
   * @param {*} options
   * @returns
   */

  spotMarketBuy(symbol, quantity, options = {}) {
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, side: "BUY", type: "MARKET", quantity, ...options },
      "POST"
    );
  }


   /**
   * SPOT : MarketSell   
   * @param {String} symbol  
   * @param {Number} quantity   
   * @param {*} options
   * @returns
   */

   spotMarketSell(symbol, quantity, options = {}) {
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, side: "SELL", type: "MARKET", quantity, ...options },
      "POST"
    );
  }



  /**
   * SPOT : LimitBuy
   * @param {String} symbol  
   * @param {Number} quantity
   * @param {Number} price   
   * @param {*} options
   * @returns
   */

  spotLimitBuy(symbol, quantity, price, options = {timeInForce: 'GTC'}) {
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, side: "BUY", type: "LIMIT", quantity, price, ...options },
      "POST"
    );
  }


  /**
   * SPOT : LimitSell
   * @param {String} symbol  
   * @param {Number} quantity
   * @param {Number} price   
   * @param {*} options
   * @returns
   */

  spotLimitSell(symbol, quantity, price, options = {timeInForce: 'GTC'}) {
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, side: "SELL", type: "LIMIT", quantity, price, ...options },
      "POST"
    );
  }




  /**
   * Cancel an active order.
   * @param {*} symbol - symbol
   * @param {*} orderId - orderId
   * @param {*} options 
   * @returns 
   */
  spotCancelOrder(symbol, orderId, options = {}) {
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, orderId, ...options },
      "DELETE"
    );
  }


  /**
   * Cancels all active orders on a symbol.
   * Detail: https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade
   * @param {*} symbol - symbol   
   * @param {*} options 
   * @returns 
   */
  spotCancelAllOrders(symbol, options = {}) {
    return this.signedRequest(
      endpoints.base + "v3/openOrders",
      { symbol, ...options },
      "DELETE"
    );
  }

  /**
   * Check an order's status.
   * For more information, see the [Official Binance Api Documentation](https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data).
   * @param {*} symbol 
   * @param {*} orderId 
   * @param {*} options 
   * @returns 
   */
  getOrder(symbol, orderId, options = {}){
    return this.signedRequest(
      endpoints.base + "v3/order",
      { symbol, orderId, ...options },
      "GET"
    );
  }


  // ----------- End Spot Account/Trade Endpoints ---------

  /**
   * Fetch details of assets supported on Binance.
   * https://binance-docs.github.io/apidocs/spot/en/#asset-detail-user_data
   * @returns
   */
  assetDetail = () => {
    this.authDataRequire();

    return this.signedRequest(
      endpoints.sapi + "v1/asset/assetDetail",
      {},
      "GET"
    );
  };

  /**
   * Get user assets, just for positive data.
   * User Asset (USER_DATA)
   * https://binance-docs.github.io/apidocs/spot/en/#user-asset-user_data
   * @returns { Object }
   */
  getUserAsset = (needBtcValuation = true, options = {}) => {
    this.authDataRequire();

    return this.signedRequest(
      endpoints.sapi + "v3/asset/getUserAsset",
      { needBtcValuation, ...options },
      "POST"
    );
  };

  /**
   * Get API Key Permission (USER_DATA)
   * https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data
   * @returns { Object }
   */
  apiRestrictions = (options = {}) => {
    this.authDataRequire();

    return this.signedRequest(
      endpoints.sapi + "v1/account/apiRestrictions",
      { ...options },
      "GET"
    );
  };

  /**
   * Fetch deposit history.
   * @param {*} coin - Name of coin - Example : USDT
   * @param {*} status  - Status of transaction - 0:pending,6: credited but cannot withdraw, 1:success
   * @param {*} offset
   * @param {*} limit
   * @param {*} txId
   * @returns
   */
  depositHistory = (coin, status, offset, limit, txId, options = {}) => {
    this.authDataRequire();
    return this.signedRequest(
      endpoints.sapi + "v1/capital/deposit/hisrec",
      {
        coin,
        status,
        offset,
        limit,
        txId,
        ...options,
      },
      "GET"
    );
  };

  /**
   * Fetch deposit history.
   * @param {*} coin - Name of coin - Example : USDT
   * @param {*} status  - Status of transaction - (0:Email Sent,1:Cancelled 2:Awaiting Approval 3:Rejected 4:Processing 5:Failure 6:Completed)
   * @param {*} offset
   * @param {*} limit
   * @param {*} txId
   * @returns
   */
  withdrawHistory = (coin, status, offset, limit, options = {}) => {
    this.authDataRequire();
    return this.signedRequest(
      endpoints.sapi + "v1/capital/withdraw/history",
      {
        coin,
        status,
        offset,
        limit,
        ...options,
      },
      "GET"
    );
  };

  /**
   * Fetch account api trading status detail.
   * @returns { Object }
   */
  apiTradingStatus = () => {
    this.authDataRequire();

    return this.signedRequest(
      endpoints.sapi + "v1/account/apiTradingStatus",
      {},
      "GET"
    );
  };

  /**
   * Fetch account status detail.
   * @returns { Object }
   */
  accountStatus = () => {
    this.authDataRequire();

    return this.signedRequest(endpoints.sapi + "v1/account/status", {}, "GET");
  };

  /**
   * Funding Wallet Data
   * @returns {Array} - Array of funding wallet actives
   */
  fundingWallet = () => {
    this.authDataRequire();
    return this.signedRequest(
      endpoints.sapi + "v1/asset/get-funding-asset",
      {},
      "POST"
    );
  };

  /**
   * Fetch trade fee
   * @param {*} symbol - Trading pair symbol - optional
   * @returns {Object || Array} Object or Array
   */
  tradeFee(symbol = undefined) {
    this.authDataRequire();

    if (!symbol)
      return this.signedRequest(
        endpoints.sapi + "v1/asset/tradeFee",
        {},
        "GET"
      );

    return new Promise((resolve, reject) => {
      this.signedRequest(endpoints.sapi + "v1/asset/tradeFee", {}, "GET").then(
        (response) => {
          let filtered = response.filter((i) => i.symbol == symbol);

          filtered.length == 0
            ? reject(new Error("Symbol is invalid"))
            : resolve(filtered[0]);
        }
      );
    });
  }

  /**
   *
   * @param {*} type ENUM | For example MAIN_FUNDING - Detail https://binance-docs.github.io/apidocs/spot/en/#change-log
   * @param {*} asset - asset - example USDT
   * @param {*} amount - amount of the asset
   * @returns
   */
  universalTransfer = (type, asset, amount, options = {}) =>
    this.signedRequest(
      endpoints.sapi + "v1/asset/transfer",
      { type, asset, amount, ...options },
      "POST"
    );

  /**
   * Submit a withdraw request.
   * @param {String} coin - Currency to withdraw
   * @param {String} network - Network of Currency | see avaiable list of networks by allCoinsInformation()
   * @param {String} address
   * @param {Number} amount
   * @param {String} name - Description of withdraw ()
   * @param {Number} walletType  - 0-spot wallet | 1-funding wallet
   * @returns {Object}
   */
  withdraw = (coin, network, address, amount, name, walletType, options = {}) =>
    this.signedRequest(
      endpoints.sapi + "v1/capital/withdraw/apply",
      {
        coin,
        network,
        address,
        amount,
        name: encodeURIComponent(name.trim()),
        walletType,
        ...options,
      },
      "POST"
    );

  /**
   * Get information of coins (available for deposit and withdraw) for user.
   * @returns {Array}
   */
  allCoinsInfomation = () =>
    this.signedRequest(endpoints.sapi + "v1/capital/config/getall", {}, "GET");

  // Checking that API secret is provided
  authDataRequire() {
    if (!this.options.APIKEY)
      throw Error(`Open Binance Error: Invalid API key`);

    if (!this.options.APISECRET)
      throw Error(`Open Binance Error: Invalid API Secret`);
  }

  /**
   * Public request
   * @param {*} url
   * @param {*} data
   * @param {*} method
   * @returns
   */
  publicRequest(url, data, method = "GET") {
    let query = makeQueryString(data);

    let opt =
      method === "POST"
        ? reqObjectPost(url, data, method, this.options)
        : reqObject(url + "?" + query, data, method, this.options);

    return new Promise((res) => {
      request(opt, (err, response, body) => {
        if (err) throw Error(err);

        if (response.statusCode !== 200) throw Error(body);

        res(JSON.parse(body));
      });
    });
  }

  /**
   * Signed Request
   * @param {*} url
   * @param {*} data
   * @param {*} method
   * @returns
   */
  signedRequest(url, data, method = "GET") {
    data.timestamp = new Date().getTime() + this.options.timeOffset;

    let query = makeQueryString(data);

    let signature = crypto
      .createHmac("sha256", this.options.APISECRET)
      .update(query)
      .digest("hex");

    let opt =
      method === "POST"
        ? reqObjectPost(url, data, method, this.options)
        : reqObject(
            url + "?" + query + "&signature=" + signature,
            data,
            method,
            this.options
          );

    if (method == "POST") opt.form.signature = signature;

    return new Promise((res) => {
      request(opt, (err, response, body) => {
        if (err) throw Error(err);

        if (response.statusCode !== 200) throw Error(body);

        res(JSON.parse(body));
      });
    });
  }
};
