import axiosWrapper from "./wrapper";

export function topUp(amount: Number) {
    const response = axiosWrapper(
        "post",
        '/api/braintree/topup',
        {
            amount: amount,
        }
    );
    return response;
}

export function searchHistory() {
    const response = axiosWrapper(
        "get",
        '/api/braintree/history/search'
    );
    return response;
}