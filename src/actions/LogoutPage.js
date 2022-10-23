export function logout() {
    return async (dispatch) => {
        console.log("igo");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };
}
