'use server';
import { headers } from "next/headers";
import { auth } from "../auth";

export const updateUserRole=async(userId,role)=>{
    const data = await auth.api.setRole({
    body: {
        userId: userId,
        role: role, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return data;
}