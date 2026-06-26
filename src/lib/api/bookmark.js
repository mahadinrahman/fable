import { protectedGet, serverGet } from "../core/sever";

export const getBookmark=async(email)=>{
    return protectedGet(`/bookmark?email=${email}`);
}