const expect = require("expect");

//import isRealString
const {isRealString} = require("./validation");

//describe isRealString
describe("isRealString", () => {
  //should reject nonstring values (pass number, object, etc..)
  it("should reject non-string values", () => {
    var res = isRealString(98);
    expect(res).toBeFalsy();
  });
  //should reject strings with only spaces
  it("should reject strings with only spaces", () =>{
    var res = isRealString("     ");
    expect(res).toBeFalsy();
  });
  //should allow strings with non-space characters
  it("should allow strings with non-space characters", () => {
    var res = isRealString("  Andrew  ");
    expect(res).toBeTruthy();
  });
});
