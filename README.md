For installation `npm install`

Additionally, in order for http requests to work as expected, a file named .env must be created in the root directory and the `VITE_APP_BASE_URL` and `VITE_EXCHANGE_RATE_API_KEY` variables must be created.

The value of the VITE_APP_BASE_URL variable is constant and is `https://api.apilayer.com`.

The value of the VITE_EXCHANGE_RATE_API_KEY variable is personal and is the api key that the system gives you when an account is created at [https://apilayer.com/marketplace/exchangerates_data-api](https://apilayer.com/marketplace/exchangerates_data-api).

I am sharing my own .env file content with you so that the task can be checked.

```
VITE_APP_BASE_URL=https://api.apilayer.com
VITE_EXCHANGE_RATE_API_KEY=WhHhTA1PVLCQnO0fcRCMbOGvVcPX53rS
```
