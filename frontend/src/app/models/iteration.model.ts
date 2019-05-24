import { Card } from './card.model';

export interface Iteration {
    _id: string;
    _parent: string;
    title: string;
    description: string;
    goal: string;
    state: string;
    cards: [Card];
    finishDate: Date;
}
