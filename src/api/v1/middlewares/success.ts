export default function (req, res) {
  res.status(200).send({
    status: 'success',
    payload: req.payload
  })
}