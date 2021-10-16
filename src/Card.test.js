const rewire = require("rewire")
const Card = rewire("./Card")
const titleCase = Card.__get__("titleCase")
// @ponicode
describe("titleCase", () => {
    test("0", () => {
        let callFunction = () => {
            titleCase(["<?xml version=\"1.0\" ?><a b=\"c\"/>", "<?xml version=\"1.0\" ?><a b=\"c\"/>", "<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            titleCase(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
