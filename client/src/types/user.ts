import { Card } from "./cards";

export interface User {
    firstName: string;
    lastName: string;
    id: string;
    words: Card[];
}
