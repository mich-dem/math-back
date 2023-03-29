import {MathRecord} from "../record/math.record";

test("Can build record", () => {
    const xx = new MathRecord({
        id: 'jakis',
        nick: 'Tales',
        pass: 'xxx',
        email: 'abc@def.pl',
        add: 0,
        sub: 0,
        mul: 0,
        div: 0,
    });
    expect(xx.id).toBe('jakis');
    expect(xx.nick).toBe('Tales');
    expect(xx.pass).toBe('xxx');

})