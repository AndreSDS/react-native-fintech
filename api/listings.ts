import { customFetch } from "./api";

export async function getCryptos(limit?: number) {
    
    const limits = limit || 5;
    
    const resData = await customFetch(`/listings/latest?start=1&limit=${limits}&convert=EUR`);

    const res = await resData.json();
    return res.data;
}