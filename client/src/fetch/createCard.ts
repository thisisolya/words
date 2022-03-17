export const createCard = (cardInfo: Record<string, any>) => {
    return fetch("http://localhost:8080/cards/create", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(cardInfo),
    })
}
