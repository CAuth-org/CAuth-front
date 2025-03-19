import api from "@/util/http"

function getversion() {
  return api.get("/version")
}

export default {
    getversion
}