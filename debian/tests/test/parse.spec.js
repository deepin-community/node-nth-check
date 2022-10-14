const expect = require('expect.js');
const { parse } = require("../../../lib/parse");
const { valid, invalid } = require("./__fixtures__/rules");

describe("parse", () => {
    it("parse invalid", () => {
        for (const formula of invalid) {
            expect(() => parse(formula)).to.throwError(Error);
        }
    });

    it("parse valid", () => {
        for (const [formula, result] of valid) {
            expect(parse(formula)).to.eql(result);
        }
    });
});
