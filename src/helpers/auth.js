import moment from "moment";

const AuthHelper = {
    isAuthenticated() {
        const jsonData = JSON.parse(localStorage.getItem("user"));
        if (!jsonData) {
            return false;
        }

        const { token, last_login } = jsonData;
        const now = moment();

        if (token && last_login) {
            const tokenLifeInSeconds = now.diff(
                moment(new Date(last_login)).toISOString(),
                "seconds"
            );
            return tokenLifeInSeconds < 86400;
        }

        return false;
    },
};

export default AuthHelper;
