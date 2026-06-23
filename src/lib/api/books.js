import { serverGet } from "../core/sever";

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getBooksById=async(userId,status='published')=>{
    const res=await fetch(`${baseUrl}/books?userId=${userId}&status=${status}`)
    return res.json();
}

export const getAllBooks =async()=>{
   return serverGet(`/books`);
}

export const getDetailsBook=async(id)=>{
    return serverGet(`/books/${id}`);
}