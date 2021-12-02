# RedStone oracle monitoring service

TODO: improve this specification

TODO: describe the basic idea.
- Notifications
  - Warnings for untypical data delays
  - Errors for significant data delays
- Automated disputes (in future)

I think we should save the errors in database and notifiers should aggregate data from DB


## Configuration

### Checkers
Example is below:
```js
{
  sources: [
    {
      url: "https://api.redstone.finance/packages/latest?provider=redstone-avalanche",
      getParams: {
        provider: "redstone-avalanche"
      },
      type: "cache-layer",
      responseFormat: "package",
      verifyLiteEvmSignature: true,
      timestampDelayMillisecondsError: 3 * 60 * 1000, // 3 mins
      timestampDelayMillisecondsWarning: 60 * 1000, // 1 minute
      interval: 10 * 1000, // 10 seconds
    },

    {
      url: "https://api.redstone.finance/packages/latest",
      getParams: {
        provider: "redstone-avalanche",
        symbol: "AVAX"
      },
      type: "cache-layer",
      responseFormat: "package",
      verifyLiteEvmSignature: true,
      timestampDelayMillisecondsError: 3 * 60 * 1000, // 3 mins
      timestampDelayMillisecondsWarning: 60 * 1000, // 1 minute
      interval: 10 * 1000, // 10 seconds
    },

    /// ... similar for each symbol

  ],

  notifiers: {
    "email": {
      "interval": 5 * 60 * 1000, // 5 minutes
      "levels": ["WARNING", "ERROR"]
    },

    // We'll implement later
    "sms": {
      "interval": 60 * 60 * 1000, // 60 minutes
      "levels": ["ERROR"]
    },
    "discord": {
      "interval": 5 * 60 * 1000, // 5 minutes
      "levels": ["ERROR"]
    }
  },
}
```

## Things to consider
Allow notification spamming. If something doesn't work, we should not send the same notification every 10 seconds (or even every minute)
