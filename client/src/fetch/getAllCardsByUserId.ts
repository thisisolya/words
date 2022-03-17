export const getAllCardsByUserId = (userId: string) => {
    return fetch("http://localhost:8080/cards", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({ userId }),
    })
}
