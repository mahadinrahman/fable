import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 

export const authHeader=async()=>{
    const token=await getUserToken();
    const header=token?{
        authorization:`Bearer ${token}`
    }:{};
    return header;
}

export const serverGet=async (path)=>{
    const res=await fetch(`${baseUrl}${path}`)
    return res.json()
}

export const protectedGet=async (path)=>{
    const res=await fetch(`${baseUrl}${path}`,{

        headers:await authHeader()
    })
    
    // handle 401,403,404
    if(res.status===401){
        redirect('/unauthorized');
    }
    else if(res.status===403){
        redirect('/unauthorized');
    }

    
    return res.json()
}


export const serverMutation =async (path,data)=>{

    const res=await fetch(`${baseUrl}${path}`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
              ... await authHeader()
        },
        body:JSON.stringify(data)
    })

     // handle 401,403,404
    if(res.status===401){
        redirect('/unauthorized');
    }
    else if(res.status===403){
        redirect('/unauthorized');
    }


      return res.json()
}

export const updateMutation =async (path,data)=>{
     const res=await fetch(`${baseUrl}${path}`,{
        method:'PATCH',
        headers:{
            'content-type':'application/json',
              ... await authHeader()
        },
        body:JSON.stringify(data)
    })

   
    // handle 401,403,404
    if(res.status===401){
        redirect('/unauthorized');
    }
    else if(res.status===403){
        redirect('/unauthorized');
    }


    return res.json()
}
export const deleteMutation =async (path,data)=>{

    const res=await fetch(`${baseUrl}${path}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json',
             ... await authHeader()
        },
        body:JSON.stringify(data)
    })

   // handle 401,403,404
    if(res.status===401){
        redirect('/unauthorized');
    }
    else if(res.status===403){
        redirect('/unauthorized');
    }
    
    return res.json()
}