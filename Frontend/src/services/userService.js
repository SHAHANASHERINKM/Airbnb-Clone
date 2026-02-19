import axios from "axios";
import api from "./Api";


export const login = async (data) => {
  const API_URL = import.meta.env.VITE_BASE_URL + "auth/login";

  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup=async(data)=>{
  const API_URL=import.meta.env.VITE_BASE_URL+"auth/register";
  try{
const response=await axios.post(API_URL,data);
return response.data;
  }
  catch(error){
    console.error(error);
    throw error;

  }

};

export const becomeHost=async(token)=>{
    const API_URL=import.meta.env.VITE_BASE_URL+"users/become-host"
    try{
        
       const response = await axios.put(
      API_URL,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
        console.log(response)
        return response.data;

    }
    catch(error){
        console.error("become host error:",error);
        throw error;

    }
};

export const getUsers=async()=>{
  try{
    const res=await api.get("admin/users?role=user");
    // console.log("users",res.data);
    return res.data;

  }
  catch(error){
    throw error;
    
  }
}

export const getHosts=async()=>{
  try{
    const res=await api.get("admin/users?role=host");
    console.log("host",res.data);
    return res.data;

  }
  catch(error){
    throw error;
    
  }
}

export const blockUser=async(userId)=>{
  try{
    const res=await api.patch(`admin/block-user/${userId}`);
    return res.data;
  }
  catch(error){
    throw error;
  }
}

export const unblockUser=async(userId)=>{
  console.log(userId)
  try{
    const res=await api.patch(`admin/unblock-user/${userId}`);
    return res.data;
  }
  catch(error){
    throw error;
  }
}

export const blockHost=async(hostId)=>{
  try{
    const res=await api.patch(`admin/block-host/${hostId}`);
    return res.data;
  }
  catch(error){
    throw error;
  }
}

export const unblockHost=async(hostId)=>{

  try{
    const res=await api.patch(`admin/unblock-host/${hostId}`);
    return res.data;
  }
  catch(error){
    throw error;
  }
}

export const fetchHostReq=async ()=>{
    try{
        const res = await api.get(`admin/users?role=user&hostStatus=pending`);
console.log(res.data);
return res.data;

    }
    catch(error){
        throw error;

    }
}

export const approveHost=async(hostId)=>{
    try{
        const res=await api.patch(`admin/host-approval/${hostId}`);
        console.log("re",res.data)
        return res.data;

    }
    catch(error){
        throw error;

    }
}

export const rejectHost=async(hostId)=>{
    try{
        const res=await api.patch(`admin/host-rejection/${hostId}`);
        return res.data;

    }
    catch(error){
throw error;
    }
}