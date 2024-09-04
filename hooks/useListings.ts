import { getCryptos } from "@/api/listings";
import { useQuery } from "@tanstack/react-query";

export const useListings = () => {
    return useQuery({ 
        queryKey: ['listings'],
        queryFn: () => { 
        return getCryptos()}
})}
