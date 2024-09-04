import { customFetch } from "./api";

export async function getCryptoByIds(ids?: number[]) {
    const resData = await customFetch(`/info?id=${ids}`);

    const res = await resData.json();
    return res.data;
}