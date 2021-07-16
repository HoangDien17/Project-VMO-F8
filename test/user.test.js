const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
// const { expect } = require("chai");
const should = chai.should();
const db = require("../src/models");
const sinon = require("sinon");

chai.use(chaiHttp);

describe("API User", () => {
  var userFake;
  before((done) => {
    userFake = sinon.stub(db.User, "save").yields([
      {
        id: 1,
        username: "itemtest",
        password: "123456",
      },
    ]);
    userFake.withArgs({});
    done();
  });

  after((done) => {
    userFake.restore();
    done();
  });

  describe("/Post login user", () => {
    it("it should login user successful", (done) => {
      let test = {
        username: "itemtest",
        password: "123456",
      };
      chai
        .request(server)
        .post("/api/login/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Login succesful");
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          done();
        });
    });

    it("it should not found username or password", (done) => {
      let test = {
        username: "ukno334",
        password: "123456",
      };
      chai
        .request(server)
        .post("/api/login/")
        .set("Accept", "application/json")
        .send(test)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .eql("Wrong user or password");
          done();
        });
    });
  });

  describe("/Post create user", () => {
    // it("it should create user successful", (done) => {
    //   let test = {
    //     username: "uknow6",
    //     password: "123456",
    //   };
    //   chai
    //     .request(server)
    //     .post("/api/create/")
    //     .set("Accept", "application/json")
    //     .send(test)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.have
    //         .property("message")
    //         .eql("Create new user successful");
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("data");
    //       done();
    //     });
    // });

    it("it should username exists", (done) => {
      let test = {
        username: "uknow1",
        password: "123456",
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
  });
  describe("/PUT update role", () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post("/api/login/")
        .set("Accept", "application/json")
        .send({
          username: "uknow2",
          password: "123456",
        })
        .end((err, res) => {
          token = res.body.data.tokenAccess; //----------------TOKEN SET
          done();
        });
    });

    it("it should invalid role update", (done) => {
      chai
        .request(server)
        .put("/api/users/5")
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .send({ role: "gamer" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid role update");
          done();
        });
    });

    it("it should update role successful by admin ", (done) => {
      chai
        .request(server)
        .put("/api/users/5")
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .send({ role: "Manager" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Update successful");
          done();
        });
    });
  });
  describe("/Delete user", () => {
    it("it should delete successfull", (done) => {
      chai
        .request(server)
        .post("/api/login/")
        .send({
          username: "uknow2",
          password: "123456",
        })
        .end((err, res) => {
          token = res.body.data.tokenAccess; //----------------TOKEN SET
          chai
            .request(server)
            .del("/api/users/28")
            .set({ Authorization: `Bearer ${token}` })
            .set("Accept", "application/json")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have
                .property("message")
                .eql("Delete User successful");
              done();
            });
          done();
        });
    });
  });
});
