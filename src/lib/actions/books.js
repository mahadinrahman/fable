'use server'
import { deleteMutation, serverMutation, updateMutation } from "../core/sever";
const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const createBook =async (newBookData)=>{
   return serverMutation('/books',newBookData)
}
export const updateBook =async (bookId,updateData)=>{
   return updateMutation(`/books/${bookId}`,updateData)
}
export const delelteBook =async (bookId)=>{
   return deleteMutation(`/books/${bookId}`)
}