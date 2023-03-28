export interface MathEntity {
    id: string;
    nick: string;
    pass: string;
    add: number;
    sub: number;
    mul: number;
    div: number;
    email: string;
}

export interface NewMathEntity extends Omit<MathEntity, 'id'> {
    id?: string;
}

export interface MathTaskRes {
    add: number;
    sub: number;
    mul: number;
    div: number;
}

export interface MathToList {
    nick: string;
    add: number;
    sub: number;
    mul: number;
    div: number;
}