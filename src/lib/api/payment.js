import { protectedGet, serverGet } from "../core/sever";

export const getPayment=async()=>{
    return protectedGet(`/payments`);
}