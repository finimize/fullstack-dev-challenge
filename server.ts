import { createApp } from './server/app.js'

const app = createApp()
const port = Number(process.env.PORT) || 3001

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Find the server at: http://localhost:${port}/`)
})
