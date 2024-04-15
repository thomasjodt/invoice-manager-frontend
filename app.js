import express from 'express'
import viteExpress from 'vite-express'

const PORT = 7567
const app = express()

viteExpress.config({ mode: "production" })
viteExpress.listen(app, PORT)
