export interface Card {
    cardId: string,
    userId: string,
    english: string,
    russian: string,
}
export interface User {
    firstName: string;
    lastName: string;
    id: string;
    cards: Card[];
}
export interface CardModelFromServer {
    _id: string,
    user_id: string,
    english: string,
    russian: string,
}

export interface UserModelFromServer {
    first_name: string;
    last_name: string;
    _id: string;
    cards: CardModelFromServer[];
}
