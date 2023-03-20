import {MathEntity, MathTaskRes, MathToList, NewMathEntity} from "../types";
import {ValidationError} from "../util/errors";
import {pool} from "../util/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

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

        this.id = obj.id;
        this.nick = obj.nick;
        this.pass = obj.pass;
        this.add = obj.add ?? 0;
        this.sub = obj.sub ?? 0;
        this.mul = obj.mul ?? 0;
        this.div = obj.div ?? 0;
    }

    static async getOne(id: string): Promise<MathRecord | null> {
        const [results] = await pool.execute('SELECT * FROM `math` WHERE id = :id', {
            id
        }) as MathRecordResults;
        return results.length === 0 ? null : new MathRecord(results[0]);
    };

    static async checkNick(nick: string): Promise<boolean> {
        const [results] = await pool.execute('SELECT * FROM `math` WHERE nick = :nick', {
            nick
        }) as MathRecordResults;
        return results.length === 0;
    };

    static async checkLog(nick: string, pass: string): Promise<boolean> {
        const [results] = await pool.execute('SELECT * FROM `math` WHERE nick = :nick AND pass = :pass', {
            nick, pass
        }) as MathRecordResults;
        return results.length !== 0;
    };

    static async findAll(name: string): Promise<MathToList[]> {
        let sqlStr;
        switch (name) {
            case 'add':
                sqlStr = "SELECT * FROM `math` ORDER BY `add` DESC";
                break;
            case 'sub':
                sqlStr = "SELECT * FROM `math` ORDER BY `sub` DESC";
                break;
            case 'mul':
                sqlStr = "SELECT * FROM `math` ORDER BY `mul` DESC";
                break;
            case 'div':
                sqlStr = "SELECT * FROM `math` ORDER BY `div` DESC";
                break;
            case 'nick':
            default:
                sqlStr = "SELECT * FROM `math` ORDER BY `nick` ASC";
        }
        const [results] = await pool.execute(sqlStr) as MathRecordResults;
        return results.map(result => {
            const {nick, add, sub, mul, div} = result;
            return {nick, add, sub, mul, div};
        });
    }

    static async getOneRes(nick: string): Promise<MathTaskRes> {
        const [[results]] = await pool.execute('SELECT `add`, `sub`, `mul`, `div` FROM `math` WHERE nick = :nick', {
            nick
        }) as MathRecordResults;
        return results;
    };

    static async addPoints(nick: string, name: string, val: number): Promise<boolean> {
        const ent = await MathRecord.getOneRes(nick);
        await pool.execute("UPDATE `math` SET  `add` = :add, `sub` = :sub, `mul` = :mul, `div` = :div WHERE nick = :nick", {
            nick,
            add: name === 'add' ? ent.add + val : ent.add,
            sub: name === 'sub' ? ent.sub + val : ent.sub,
            mul: name === 'mul' ? ent.mul + val : ent.mul,
            div: name === 'div' ? ent.div + val : ent.div,
        })
        return true;
    };

    async insert(): Promise<void> {
        if (await MathRecord.checkNick(this.nick)) {
            if (!this.id) {
                this.id = uuid();
                await pool.execute("INSERT INTO `math` (`id`, `nick`, `pass`, `add`, `sub`, `mul`, `div`) VALUES (:id, :nick, :pass, :add, :sub, :mul, :div)", this)
            } else {
                throw new ValidationError("Takie id juz istnieje");
            }
        } else {
            throw new ValidationError("Taki nick juz istnieje");
        }
    };
}