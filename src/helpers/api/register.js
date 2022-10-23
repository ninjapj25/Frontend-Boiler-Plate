/* eslint-disable import/no-anonymous-default-export */
import request from "./request";

export default {
    async register(username, password) {
        const response = await request.post("/api/user/register", {
            username,
            password,
        });
        return response;
    },
};
