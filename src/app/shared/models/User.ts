import { FieldValue } from "@angular/fire/firestore";

export interface User{
    id: string;
    email: string;
    username: string;
    profilePictureUrl: string
    follows: FieldValue | string[]
}