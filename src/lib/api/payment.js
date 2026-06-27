import { serverGet } from "../core/sever";

export const getPayment=async()=>{
    return serverGet(`/payments`);
}