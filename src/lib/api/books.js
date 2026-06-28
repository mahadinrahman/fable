import { serverGet } from "../core/sever";

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getBooksById=async(userId,status='published')=>{
    const res=await fetch(`${baseUrl}/book?userId=${userId}&status=${status}`)
    return res.json();
}

export const getAllBooks =async(page)=>{
    if(!page){
       page=1
    }
   return serverGet(`/books?page=${page}`);
}
export const getAdminBooks =async()=>{
   return serverGet(`/allBooks`);
}

export const getDetailsBook=async(id)=>{
    return serverGet(`/books/${id}`);
}