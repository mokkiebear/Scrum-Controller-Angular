import { Card } from './card.model';

export interface Iteration {
    _parent: String;
    title: String;
    description: String;
    cards: [Card];
}