import { serverGet } from "../core/sever";

export const getUsers=async()=>{
    return serverGet(`/users`);
}