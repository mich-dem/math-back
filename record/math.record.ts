import {MathEntity, NewMathEntity} from "../types";
import {ValidationError} from "../util/errors";
import {pool} from "../util/db";
import {FieldPacket} from "mysql2";

type MathRecordResults = [MathEntity[], FieldPacket[]];

export class MathRecord implements MathEntity {
    id: string;
    nick: string;
    pass: string;
    add: number;
    div: number;
    mul: number;
    sub: number;

    constructor(obj: NewMathEntity) {
        if (!obj.nick || obj.nick.length > 24) {
            throw new ValidationError("Nick nie może być pusta nazwa, ani nue może przekraczać 24 znaków.")
        }
        if (typeof obj.add !== "number") {
            throw new ValidationError("Nie zgadzają się punkty dodawania.")
        }
        if (typeof obj.sub !== "number") {
            throw new ValidationError("Nie zgadzają się punkty odejmowania.")
        }
        if (typeof obj.mul !== "number") {
            throw new ValidationError("Nie zgadzają się punkty mnozenia.")
        }
        if (typeof obj.div !== "number") {
            throw new ValidationError("Nie zgadzają się punkty dodawania.")
        }

        this.id = obj.id;
        this.nick = obj.nick;
        this.pass = obj.pass;
        this.add = obj.add;
        this.sub = obj.sub;
        this.mul = obj.mul;
        this.div = obj.div;
    }

    static async getOne(id: string): Promise<MathRecord | null> {
        const [results] = await pool.execute('SELECT * FROM `math` WHERE id = :id', {
            id
        }) as MathRecordResults;
        return results.length === 0 ? null : new MathRecord(results[0]);
    }
}