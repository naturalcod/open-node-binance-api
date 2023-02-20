
[========]




[![Open-Binance-Api-Client](https://imageup.ru/img158/4220287/open-binance-api.png "Open-Binance-Api-Client")](https://github.com/naturalcod/open-node-binance-api "Open-Binance-Api-Client")

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


##### Fetch details of assets supported on Binance.

```javascript
OBinance.assetDetail().then((result) => {
    console.log("assetDetail Result", result);
}).catch((err) => {
    console.log("assetDetail Error: ", err);
});

```


##### Get user assets, just for positive data.

```javascript
OBinance.getUserAsset().then((result) => {
    console.log("getUserAsset Result", result);
}).catch((err) => {
    console.log("getUserAsset Error: ", err);
});

```


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


# Market Data Endpoints


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


# Spot Account/Trade Endpoints



##### Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.
```javascript
OBinance.testNewOrder("BTCUSDT", "BUY", "LIMIT", 0.001, "GTC").then((result) => {
  console.log("testNewOrder Result:", result);
}).catch((err) => {
  console.log("testNewOrder Error: ", err);
});

```

##### SPOT : MarketBuy   
```javascript
OBinance.spotMarketBuy("BTCUSDT", 0.001).then((result) => {
  console.log("spotMarketBuy Result:", result);
}).catch((err) => {
  console.log("spotMarketBuy Error: ", err);
});

```


##### SPOT : MarketSell   
```javascript
OBinance.spotMarketSell("BTCUSDT", 0.001).then((result) => {
  console.log("spotMarketSell Result:", result);
}).catch((err) => {
  console.log("spotMarketSell Error: ", err);
});

```


##### SPOT : LimitBuy
```javascript
OBinance.spotLimitBuy("BTCUSDT", 0.001, 24000).then((result) => {
  console.log("spotLimitBuy Result:", result);
}).catch((err) => {
  console.log("spotLimitBuy Error: ", err);
});

```


##### SPOT : LimitSell
```javascript
OBinance.spotLimitSell("BTCUSDT", 0.001, 24000).then((result) => {
  console.log("spotLimitSell Result:", result);
}).catch((err) => {
  console.log("spotLimitSell Error: ", err);
});

```


##### Cancel an active order.
```javascript
OBinance.spotCancelOrder("BTCUSDT", 123456).then((result) => {
  console.log("spotCancelOrder Result:", result);
}).catch((err) => {
  console.log("spotMarkspotCancelOrderetBuy Error: ", err);
});

```


##### Cancels all active orders on a symbol.
```javascript
OBinance.spotCancelAllOrders("BTCUSDT").then((result) => {
  console.log("spotCancelAllOrders Result:", result);
}).catch((err) => {
  console.log("spotCancelAllOrders Error: ", err);
});

```


##### Check an order's status.
```javascript
OBinance.getOrder("BTCUSDT", 123456).then((result) => {
  console.log("getOrder Result:", result);
}).catch((err) => {
  console.log("getOrder Error: ", err);
});

```