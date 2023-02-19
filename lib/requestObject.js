module.exports.reqObject = (url, data = {}, method = 'GET', BinanceOptions) => ({
    url: url,
    qs: data,
    method: method,
    form: {},
    // family: BinanceOptions.options.family,
    // localAddress: BinanceOptions.options.localAddress,
    timeout: BinanceOptions.recvWindow,
    // forever: BinanceOptions.options.keepAlive,
    headers: {
        //'User-Agent': BinanceOptions.userAgent,
        //'Content-type': BinanceOptions.contentType,
        'X-MBX-APIKEY': BinanceOptions.APIKEY || ''
    }
})


module.exports.reqObjectPost = ( url, data = {}, method = 'POST', BinanceOptions ) => ( {
    url: url,
    form: data,
    method: method,
    // family: Binance.options.family,
    // localAddress: Binance.options.localAddress,
    timeout: BinanceOptions.recvWindow,
    // forever: Binance.options.keepAlive,
    qsStringifyOptions: {
        arrayFormat: 'repeat'
    },
    headers: {
        //'User-Agent': userAgent,
        //'Content-type': contentType,
        'X-MBX-APIKEY': BinanceOptions.APIKEY || ''
    }
} )