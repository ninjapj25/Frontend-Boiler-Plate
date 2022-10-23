/* eslint-disable import/no-anonymous-default-export */
import superagent from "superagent";
import { defaultAPI } from "../../config";

const getToken = () =>
    localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : "";

export default {
    get(url, query = {}) {
        return new Promise(function (resolve, reject) {
            superagent
                .get(`${defaultAPI}${url}`)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${getToken()}`)
                .query(query)
                .end((error, result) => {
                    if (error) {
                        return reject({
                            error: error,
                            result: result,
                        });
                    }
                    resolve(result.body);
                });
        });
    },
    post(url, body = {}) {
        return new Promise(function (resolve, reject) {
            superagent
                .post(`${defaultAPI}${url}`)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${getToken()}`)
                .send(body)
                .end((error, result) => {
                    if (error) {
                        return reject({
                            error: error,
                            result: result,
                        });
                    }
                    resolve(result.body);
                });
        });
    },
    patch(url, body = {}) {
        return new Promise(function (resolve, reject) {
            superagent
                .patch(`${url}`)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${getToken()}`)
                .send(body)
                .end((error, result) => {
                    if (error) {
                        return reject({
                            error: error,
                            result: result,
                        });
                    }
                    resolve(result.body);
                });
        });
    },
    delete(url, query = {}) {
        return new Promise(function (resolve, reject) {
            superagent
                .del(`${url}`)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${getToken()}`)
                .query(query)
                .end((error, result) => {
                    if (error) {
                        return reject({
                            error: error,
                            result: result,
                        });
                    }
                    resolve(result.body);
                });
        });
    },
};
