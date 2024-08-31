import { ExpoRequest, ExpoResponse } from 'expo-router/server';
const API_KEY = process.env.CRYPTO_API_KEY;

export async function GET(request, response) {
    const limit = request.expoUrl.searchParams.get('limit') || 5;

    const resData = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`, {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY!
        }
    });

    const res = await resData.json();

    return response.json(res.data)
}