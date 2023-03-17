export interface MathEntity {
    id: string;
    nick: string;
    pass: string;
    add: number;
    sub: number;
    mul: number;
    div: number;
}

export interface NewMathEntity extends Omit<MathEntity, 'id'> {
    id: string;
}