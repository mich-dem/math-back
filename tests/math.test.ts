import {MathRecord} from "../record/math.record";

test('Download data from DB', async () => {
    const ad = await MathRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.nick).toBe('Michu');
    expect(ad.pass).toBe('misiu');
});

test('If isnt returned null', async () => {
    const ad = await MathRecord.getOne('---');

    expect(ad).toBeNull();
})
