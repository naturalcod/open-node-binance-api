[
![Open-Binance-Api-Client](https://imageup.ru/img158/4220287/open-binance-api.png "Open-Binance-Api-Client")](https://github.com/naturalcod/open-node-binance-api "Open-Binance-Api-Client")

# Binance Api Client
NodeJS Binance API Client
# Install
`npm i open-binance-api`

# Usage

```javascript
const OpenBinance = require("open-binance-api");

let OBinance = new OpenBinance(
  "API_KEY",
  "SECRET_KEY"
);

```

# Account/Wallet

##### Get Api Restrictions

```javascript
OBinance.apiRestrictions().then((result) => {
    console.log("apiRestrictions Result", result);
}).catch((err) => {
    console.log("apiRestrictions Error: ", err);
});
```

##### Get Trade Fee
```javascript
OBinance.tradeFee("BTCUSDT").then((result) => {
  console.log("tradeFee Result", result);
}).catch((err) => {
  console.log("tradeFee Error: ", err);
});

```


##### Test connectivity to the Rest API.
```javascript
OBinance.ping().then((result) => {
  console.log("ping Result:", result);
}).catch((err) => {
  console.log("ping Error: ", err);
});

```


##### Test connectivity to the Rest API and get the current server time.
```javascript
OBinance.checkServerTime().then((result) => {
  console.log("checkServerTime Result:", result);
}).catch((err) => {
  console.log("checkServerTime Error: ", err);
});

```


##### Current exchange trading rules and symbol information
```javascript
OBinance.exchangeInfo().then((result) => {
  console.log("exchangeInfo Result:", result);
}).catch((err) => {
  console.log("exchangeInfo Error: ", err);
});

```


##### Order Book
```javascript
OBinance.depth("BTCUSDT").then((result) => {
  console.log("depth Result:", result);
}).catch((err) => {
  console.log("depth Error: ", err);
});

```


##### Get recent trades.
```javascript
OBinance.trades("BTCUSDT").then((result) => {
  console.log("trades Result:", result);
}).catch((err) => {
  console.log("trades Error: ", err);
});

```


##### Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
```javascript
OBinance.aggTrades("BTCUSDT").then((result) => {
  console.log("aggTrades Result:", result);
}).catch((err) => {
  console.log("aggTrades Error: ", err);
});

```


##### Kline/candlestick bars for a symbol.
```javascript
OBinance.klines("BTCUSDT").then((result) => {
  console.log("klines Result:", result);
}).catch((err) => {
  console.log("klines Error: ", err);
});

```



##### Current average price for a symbol.
```javascript
OBinance.avgPrice("BTCUSDT").then((result) => {
  console.log("avgPrice Result:", result);
}).catch((err) => {
  console.log("avgPrice Error: ", err);
});

```


##### 24 hour rolling window price change statistics. Careful when accessing this with no symbol.
```javascript
OBinance.tickerPrice24hr(["BTCUSDT"]).then((result) => {
  console.log("tickerPrice24hr Result:", result);
}).catch((err) => {
  console.log("tickerPrice24hr Error: ", err);
});

```


##### Latest price for a symbol or symbols.
```javascript
OBinance.latestPrice(["BTCUSDT"]).then((result) => {
  console.log("latestPrice Result:", result);
}).catch((err) => {
  console.log("latestPrice Error: ", err);
});

```


##### Best price/qty on the order book for a symbol or symbols.
```javascript
OBinance.bookTicker(["BTCUSDT"]).then((result) => {
  console.log("bookTicker Result:", result);
}).catch((err) => {
  console.log("bookTicker Error: ", err);
});

```


##### This endpoint is different from the tickerPrice24hr() method.
```javascript
OBinance.computeStatistics(["BTCUSDT"]).then((result) => {
  console.log("computeStatistics Result:", result);
}).catch((err) => {
  console.log("computeStatistics Error: ", err);
});

```
