const API_KEY = process.env.EXPO_PUBLIC_CRYPTO_API_KEY;

const baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
const headers = { 'X-CMC_PRO_API_KEY': API_KEY!, 'Accept-Encoding': 'gzip, deflate, br', 'Accept': 'application/json' }

export async function customFetch(endPoint: string) {
    return await fetch(baseUrl + endPoint, {
        headers
    })
}