export default {
  GET: {
    status: function (req, res) {
      res
        .status(200)
        .json({status: 'success'})
    }
  }
}