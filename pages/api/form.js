export default function handler(req, res) {
  const body = req.body;
  return body.first, body.last;
}
