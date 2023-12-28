import fastify from 'fastify'

const server = fastify({
})

server.get('/', (req, reply) => {
  if (req.query.download) {
    reply.header('content-disposition', `attachment; filename="blah.md"`)
  }

  if (req.query.num) {
    const num = Number(req.query.num)
    if (!Number.isSafeInteger(num) || num < 0) {
      throw new Error('num must be a positive integer')
    }

    const s = []
    for (let i = 0; i < num; i++) {
      s.push("*".repeat(i + 1))
    }

    return s.join("\n")
  }

  reply.header('Content-Type', 'text/html')
  return `
    <p>
      <form method="get" action="/">
        <span>Number of rows: </span>
        <input type="number" name="num" value="5">

        <button type="submit">Submit</button>

        <p>
          <a href="/?num=10">Normal link</a>
        </p>
        <p>
          <a href="/?num=10" download>Link with download attr</a>
        </p>
        <p>
          <a href="/?num=10" download="text.txt">Link with download attr set to something</a>
        </p>
      </form>
    </p>
  `
})

server.listen({
  port: 3013
})
