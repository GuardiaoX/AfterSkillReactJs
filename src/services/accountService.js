import { api } from "./AfterSkillApi";

export const registerApi = async (objUser) => {
    try {
    const request = await api.post("/auth/signup", objUser)
    return request
    } catch(e){
        return e
    }
}

export const loginApi = async (objUser) => {
    try {
    const request = await api.post("/auth/signin", objUser)
    return request
    } catch(e){
        return e
    }
}