import {MathRecord} from "../record/math.record";

test("Can build record", () => {
    const xx = new MathRecord({
        id: 'jakis',
        nick: 'Tales',
        pass: 'xxx',
        add: 3,
        div: 4,
        mul: 1,
        sub: 0,
    });
    expect(xx.id).toBe('jakis');
    expect(xx.nick).toBe('Tales');
    expect(xx.pass).toBe('xxx');
    expect(xx.add).toBe(3);
    expect(xx.div).toBe(4);
    expect(xx.mul).toBe(1);
    expect(xx.sub).toBe(0);

})