var expect = chai.expect;
var sanity = ()=>{return true;};

describe("The sanity",()=>{
  it("should return true", ()=>{
    expect(sanity()).to.equal(true);
  });
})