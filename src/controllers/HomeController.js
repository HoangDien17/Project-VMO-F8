class HomeController {
  index(req, res) {
    res.status(200).send("Hello World")
  }
}

module.exports = new HomeController