const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 

export const serverGet=async (path)=>{
    const res=await fetch(`${baseUrl}${path}`)
    return res.json()
}

export const serverMutation =async (path,data)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(data)
    })
      return res.json()
}


export const updateMutation =async (path,data)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:'PATCH',
        headers:{
            'content-type':'application/json',
            
        },
        body:JSON.stringify(data)
    })

   // handle 401,403,404
    return res.json()
}
export const deleteMutation =async (path,data)=>{
    const res=await fetch(`${baseUrl}${path}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json',
            
        },
        body:JSON.stringify(data)
    })

   // handle 401,403,404
    return res.json()
}