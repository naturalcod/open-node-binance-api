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
  console.log("ping Result", result);
}).catch((err) => {
  console.log("ping Error: ", err);
});

```
