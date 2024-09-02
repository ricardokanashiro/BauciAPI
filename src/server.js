import { app } from "./app.js"

(() => {
   try {
      app.listen(3000, () => console.log("Server listening on port 3000"))
   } catch (error) {
      console.log("Error on start server: " + error)
   }
})()