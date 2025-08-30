export default async function handler(req, res) {
  const { brief, role, tone, style } = req.body
  const proposal = `Hi there! I'm a ${role} and I’d love to help. Here's how I’d approach your project: [customized based on brief]. Looking forward to connecting!`
  res.status(200).json({ proposal })
}
