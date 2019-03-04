import { Iteration } from './iteration.model';

export interface Project {
    title: String;
    description: String;
    iterations: [Iteration];
    date: Date;
}
