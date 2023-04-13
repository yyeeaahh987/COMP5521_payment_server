import axiosWrapper from "./wrapper";

export function getTotal() {
    const response = axiosWrapper(
        "get",
        '/api/btc/total/get'
    );
    return response;
}