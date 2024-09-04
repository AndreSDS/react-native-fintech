import { useQuery } from "@tanstack/react-query";
import { getCryptoByIds } from "@/api/info";

export const useInfo = () => useQuery({ 
    queryKey: ['info'],
    queryFn: () => getCryptoByIds()
})