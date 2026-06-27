'use server';

import { updateMutation } from "../core/sever";

export const updateUsers =async (id,data)=>{
   return updateMutation(`/users/${id}`,data)
}