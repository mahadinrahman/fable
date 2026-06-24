'use server'

import { serverMutation } from "../core/sever"

export const addBookmark =async (BookmarkData)=>{
   return serverMutation('/bookmark',BookmarkData)
}