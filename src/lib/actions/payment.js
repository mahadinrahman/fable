'use server';

import { serverMutation } from "../core/sever";

export const createPayment =async (paymentData)=>{
   return serverMutation('/payments',paymentData)
}