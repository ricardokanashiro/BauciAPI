import { app } from "./app.js"
import 'dotenv/config'

const PORT = process.env.PORT || 3000

try {
   app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
} catch (error) {
   console.log("Error on start server: " + error)
}