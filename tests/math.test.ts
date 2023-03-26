import {MathRecord} from "../record/math.record";
import {NewMathEntity} from "../types";

const defaultObj: NewMathEntity = {
    nick: "Ja",
    pass: "mis",
    add: 0,
    sub: 0,
    mul: 0,
    div: 0,
}

test('Download data from DB', async () => {
    const ad = await MathRecord.getOne('7b7cf08b-cfe4-46cd-8c7e-c5d8fc4376b5');

    expect(ad).toBeDefined();
    expect(ad.nick).toBe('Michu');
    expect(ad.pass).toBe('$2b$10$C/VdLSe25AkYmN8K/RCeietAKqCIxtnRMnI7xP1XNQiko/9XMZube');
});

test('If isnt returned null', async () => {
    const ad = await MathRecord.getOne('---');

    expect(ad).toBeNull();
});

test('AdRecord.insert inserts data to database.', async () => {

    const ad = new MathRecord(defaultObj);
    await ad.insert();

    const foundAd = await MathRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
    expect(foundAd.add).toBe(ad.add);
    expect(foundAd.sub).toBe(ad.sub);
    expect(foundAd.mul).toBe(ad.mul);
    expect(foundAd.div).toBe(ad.div);
});

test('Getting 1 result: getOneRes', async () => {
    const foundAd = await MathRecord.getOneRes('ed28667b-86ea-4c0c-acda-319d95dd1695');

    expect(foundAd.add).toBe(0);
    expect(foundAd.sub).toBe(0);
    expect(foundAd.mul).toBe(0);
    expect(foundAd.div).toBe(0);
});

test('Change value Points', async () => {
    await MathRecord.addPoints('ed28667b-86ea-4c0c-acda-319d95dd1695', 'add', 5);
    const foundAd = await MathRecord.getOneRes('ed28667b-86ea-4c0c-acda-319d95dd1695');

    expect(foundAd.add).toBe(5);
    expect(foundAd.sub).toBe(0);
    expect(foundAd.mul).toBe(0);
    expect(foundAd.div).toBe(0);
});

