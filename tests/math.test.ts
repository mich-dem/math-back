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
    expect(ad.pass).toBe('xyz');
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
    const foundAd = await MathRecord.getOneRes('7b7cf08b-cfe4-46cd-8c7e-c5d8fc4376b5');

    expect(foundAd.add).toBe(4);
    expect(foundAd.sub).toBe(5);
    expect(foundAd.mul).toBe(7);
    expect(foundAd.div).toBe(9);
});

test('Change value Points', async () => {
    const ad = await MathRecord.getOne('7b7cf08b-cfe4-46cd-8c7e-c5d8fc4376b5');
    console.log(ad);
    await ad.addPoints({
        add: 10,
        sub: 20,
        mul: 40,
    });
    const foundAd = await MathRecord.getOneRes('7b7cf08b-cfe4-46cd-8c7e-c5d8fc4376b5');

    expect(foundAd.add).toBe(14);
    expect(foundAd.sub).toBe(25);
    expect(foundAd.mul).toBe(47);
    expect(foundAd.div).toBe(9);
});

