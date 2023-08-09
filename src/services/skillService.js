import { api } from "./AfterSkillApi";

export const skillListFromApi = async (objUser) => {
    const config = {
        headers: { Authorization: `Bearer ${objUser.accessToken}` }
    };
    try {
        const request = await api.get("/userSkill/SkillListFrom/?userId="+objUser.id, config)
        console.log(request)
        return request
    } catch(e){
        console.log(e)
    }
    
}

export const levelAlterApi = async (objUser, skillId, level) => {
    const config = {
        headers: { Authorization: `Bearer ${objUser.accessToken}` }
    };
    try {
        const request = await api.put("/userSkill/AlterSkillLevel/?userId="+objUser.id+"&skillId="+skillId+"&newLevel="+level,"", config)
        console.log(request)
    } catch(e){
        console.log(e)
    }
    
}

export const deleteFromApi = async (objUser, skillId) => {
    const config = {
        headers: { Authorization: `Bearer ${objUser.accessToken}` }
    };
    try {
        const request = await api.delete("/userSkill/DeleteFrom/?userId="+objUser.id+"&skillId="+skillId+"", config)
        console.log(request)
    } catch(e){
        console.log(e)
    }
    
}

export const getAllSkill = async (objUser) => {
    const config = {
        headers: { Authorization: `Bearer ${objUser.accessToken}` }
    };
    try {
        const request = await api.get("/skill/all", config)
        return request
    } catch(e){
        console.log(e)
    }
    
}

export const addSkillApi = async (objUser, skillId, level) => {
    const config = {
        headers: { Authorization: `Bearer ${objUser.accessToken}` }
    };
    try {
        const request = await api.post(`/userSkill/addTo?userId=${objUser.id}&level=${level}&SkillId=${skillId}`, {} ,config)
        console.log(request)
    } catch(e){
        console.log(e)
    }
    
}