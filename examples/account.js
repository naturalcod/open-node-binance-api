const OpenBinance = require("open-binance-api");

let OBinance = new OpenBinance(
  "API_KEY",
  "API_SECRET"
);


(async () => {

    // Fetch details of assets supported on Binance.
    var assetDetail = await OBinance.assetDetail();

    // Get user assets, just for positive data.
    var getUserAsset = await OBinance.getUserAsset();

    // Get Api Restrictions
    var apiRestrictions = await OBinance.apiRestrictions();

    // Get Trade Fee
    var tradeFee = await OBinance.tradeFee("BTCUSDT");

})()