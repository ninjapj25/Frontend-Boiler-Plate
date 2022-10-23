/* eslint-disable import/no-anonymous-default-export */
import request from "./request";

export default {
    async login(username, password) {
        const response = await request.post("/api/user/login", {
            username,
            password,
        });
        return response;
    },
    // async logout() {
    //     const res = await request.post("/admin/auth/logout");
    //     return res;
    // },
};
