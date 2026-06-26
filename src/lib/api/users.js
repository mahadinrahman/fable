'use server'
import { headers } from "next/headers";
import { auth } from "../auth";
import { protectedGet} from "../core/sever";

export const getUsers=async()=>{
    return protectedGet(`/users`);
}

export const getUsersList=async()=>{
    const users = await auth.api.listUsers({
    query: {
        sortBy: "createdAt",
        sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users;
}