import axios from 'axios'

export const axiosi=axios.create({baseURL:"http://localhost:8000",withCredentials:true})

export const loginUser=async(data)=>{
    try {
        const res=await axiosi.post("/auth/login",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const loginMember=async(data)=>{
    try {
        const res=await axiosi.post("/auth/member/login",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const signupUser=async(data)=>{
    try {
        const res=await axiosi.post("/auth/signup",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const checkAuth=async()=>{
    try {
        const res=await axiosi.get("/auth/checkauth")
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const logoutUser=async()=>{
    try {
        const res=await axiosi.get("/auth/logout")
        return res.data
    } catch (error) {
        console.log(error)
    }
}