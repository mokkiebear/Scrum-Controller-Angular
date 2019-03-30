import { Card } from './card.model';

export interface Iteration {
    _parent: string;
    title: string;
    description: string;
    cards: [Card];
}
