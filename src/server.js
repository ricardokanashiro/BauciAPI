import express from "express"

const app  = express()

app.use(express.json())

app.get("/", (req, res) => {
   res.send("Te amo amorzito <3")
})

app.listen(3000, () => console.log("Server listening on port 3000"))