import { protectedGet, serverGet } from "../core/sever";

export const getUsers=async()=>{
    return protectedGet(`/users`);
}