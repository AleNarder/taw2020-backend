export default function (err, req, res, next) {
  const { statusCode, message } = err
  res.status(statusCode).send({
    status: 'error',
    payload: message
  })
}