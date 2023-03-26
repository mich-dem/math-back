import {Router} from "express";
import {MathRecord} from "../record/math.record";


export const mathRouter = Router()

    .get('/all/:sort', async (req, res) => {
        const results = await MathRecord.findAll(req.params.sort);
        res.json(results);
    })

    .get('/res/:nick', async (req, res) => {
        const points = await MathRecord.getOneRes(req.params.nick);
        res.json(points);
    })

    .get('/plus/:nick/:name/:val', async (req, res) => {
        const value = await MathRecord.addPoints(req.params.nick, req.params.name, Number(req.params.val));
        res.json(value);
    })

    .get('/:id', async (req, res) => {
        const user = await MathRecord.getOne(req.params.id);
        res.json(user);
    })

    .post('/log', async (req, res) => {
        const {nick, pass} = req.body;
        const downId = await MathRecord.checkLog(nick, pass);
        res.json(downId);
    })

    .post('/', async (req, res) => {
        const ent = new MathRecord(req.body);
        await ent.insert();
        res.json(ent);
    })
