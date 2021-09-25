# redstone-node-monitoring
This module can be used to set up monitoring for [redstone-node](https://github.com/redstone-finance/redstone-node). It is a Node.js application that is executed in a loop. In each loop iteration multiple checkers are executed:
- [ArPriceReturnedRedstoneRapid](checkers/ar-price-returned-redstone-rapid.js)
- [ArPriceReturned](checkers/ar-price-returned.js)
- [ArweaveTimestampDelay](checkers/arweave-timestamp-delay.js)
- [HistoricalPricesReturned](checkers/historical-prices-returned.js)
- [StockPricesReturnedRedstoneStocks](checkers/stock-prices-returned-redstone-stocks.js)
- [TimestampIsCloseToNowRedstoneRapid](checkers/timestamp-is-close-to-now-redstone-rapid.js)
- [TimestampIsCloseToNow](checkers/timestamp-is-close-to-now.js)

You can implement your own checker, which should extend [Checker](checkers/checker.js) class.

## Run locally

### Install the dependencies
```bash
yarn install
```

### Run single check
```bash
yarn start
```

### Run repeated checks
```bash
yarn start:repeated
```

## Deploy on AWS
### Push docker container
```bash
# Build docker container
docker build -t CONTAINER_NAME .

# Push docker container
docker push CONTAINER_NAME
```

### Configure repeated execution
- Create AWS lambda function based on container
- Configure Cloudwatch rules to run the lambda function repeatedly
