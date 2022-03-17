export const getAllUsers = () => {
    return fetch("http://localhost:8080/", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
    })
}
