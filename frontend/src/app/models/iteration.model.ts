import { Card } from './card.model';

export interface Iteration {
    _id: String;
    title: String;
    description: String;
    cards: [Card];
    date: Date;
}