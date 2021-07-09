const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
// const { expect } = require("chai");
const should = chai.should();
const db = require("../src/models");
const sinon = require("sinon");

chai.use(chaiHttp);

describe("API User", () => {
  //  var userFake;
  //  beforeAll((done) => {
  //    userFake = sinon.stub(db.User, "create").yields(undefined, [
  //      {
  //        "username": "itemtest",
  //        "password": "123456",
  //      },
  //    ]);
  //    userFake.withArgs({});
  //    done();
  //   });

  //   afterEach((done) => {
  //     userFake.restore();
  //     done();
  //   })

  describe("/Post login user", () => {
    it("it should login user successful", (done) => {
      let test = {
        "username": "uknow2",
        "password": "123456",
      };
      chai
        .request(server)
        .post("/api/login/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Login succesful");
          res.body.should.be.a('object');
          res.body.should.have.property("data");
          done();
        });
    });

    it("it should not found username or password", (done) => {
      let test = {
        "username": "ukno334",
        "password": "123456",
      };
      chai
        .request(server)
        .post("/api/login/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("Wrong user or password");
          done();
        });
    });
  });

  describe("/Post create user", () => {
    // var userFake;
    // beforeEach((done) => {
    //   userFake = sinon.stub(db.User, "create").yields(undefined, [
    //     {
    //       "username": "itemtest",
    //       "password": "123456",
    //     },
    //   ]);
    //   userFake.withArgs({});
    //   done();
    // });

    // afterEach(() => {
    //   db.User.restore();
    // })

    it("it should create user successful", (done) => {
      let test = {
        "username": "uknow9",
        "password": "123456"
      };
      chai
        .request(server)
        .post("/api/create/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message").eql("Create new user successful");
          res.body.should.be.a('object');
          res.body.should.have.property("data");
          done();
        });
    });

    it("it should username exists", (done) => {
      let test = {
        "username": "uknow1",
        "password": "123456"
      };
      chai
        .request(server)
        .post("/api/create/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message").eql("User existed");
          done();
        });
    });
  
    describe("/PUT update role", () => {
      it("it should invalid role update", (done) => {
        chai
        .request(server)
        .put("/api/users/:id")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("Wrong user or password");
          done();
        });
      })
    })

  });
});
