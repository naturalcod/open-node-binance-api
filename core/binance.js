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

    return this.signedRequest(endpoints.sapi + "v1/account/apiTradingStatus", {}, "GET");
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
