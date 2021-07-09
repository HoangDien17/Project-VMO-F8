// const server = require("../server");
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const should = chai.should();

// chai.use(chaiHttp);

// describe("API Form", () => {
//   beforeEach((done) => {
//     chai
//       .request(server)
//       .post("/api/login/")
//       .set('Accept', 'application/json')
//       .send({
//         "username": "uknow2",
//         "password": "123456"
//       })
//       .end((err, res) => {
//         token = res.body.data.tokenAccess //----------------TOKEN SET
//         done();
//       });
//   });

//   describe("/Post create form", () => {
//     it("it should create form", (done) => {
//       let form = {
//         "typeForm": "Assessment",
//         "title": "Employee",
//         "unit": "EDU",
//         "managerId": 2,
//         "startDate": "2021-05-06",
//         "endDate": "2021-11-30",
//         "UserId": 5
//       }
//       chai
//         .request(server)
//         .post("/api/forms/")
//         .set({ "Authorization": `Bearer ${token}` })
//         .send(form)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property('message').eql('Create form successful');
//           res.body.data.should.have.property('typeForm').eql(form.typeForm);
//           res.body.data.should.have.property('title').eql(form.title);
//           res.body.data.should.have.property('unit').eql(form.unit);
//           res.body.data.should.have.property('managerId').eql(form.managerId);
//           res.body.data.should.have.property('UserId').eql(form.UserId);
//           done();
//         });
//     });
    
//   });
// });
