import { serverGet } from "../core/sever";

export const getBookmark=async(email)=>{
    return serverGet(`/bookmark?email=${email}`);
}