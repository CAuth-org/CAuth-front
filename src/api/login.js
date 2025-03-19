import api from "@/util/http"

function login(data){
    return api.post("/login",data)
}

export default {
    login
}