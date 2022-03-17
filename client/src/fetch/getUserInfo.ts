export const getUserInfo = (userId: string) => {
    return fetch("http://localhost:8080/user", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({ userId })
    })
}
