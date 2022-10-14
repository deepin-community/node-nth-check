const expect = require('expect.js');
const nthCheck = require('../../../lib');
const compile = nthCheck.compile;
const { valid } = require("./__fixtures__/rules");

const valArray = new Array(...Array(2e3)).map((_, i) => i);

/**
 * Iterate through all possible values. This is adapted from qwery,
 * and uses a more intuitive way to process all elements.
 */
function slowNth([a, b]) {
    if (a === 0 && b > 0) return [b - 1];

    return valArray.filter((val) => {
        for (let i = b; a > 0 ? i <= valArray.length : i >= 1; i += a) {
            if (val === valArray[i - 1]) return true;
        }
        return false;
    });
}

describe("parse", () => {
    it("compile & run all valid", () => {
        for (const [_, parsed] of valid) {
            const filtered = valArray.filter(compile(parsed));
            const iterated = slowNth(parsed);

            expect(filtered).to.eql(iterated);
        }
    });

    it("parse, compile & run all valid", () => {
        for (const [rule, parsed] of valid) {
            const filtered = valArray.filter(nthCheck.default(rule));
            const iterated = slowNth(parsed);

            expect([filtered, rule]).to.eql([iterated, rule]);
        }
    });
});
