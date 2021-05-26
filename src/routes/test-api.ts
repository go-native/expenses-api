import express from 'express'
const router = express.Router();

const PRODUCTS = [
  {
    id: 1,
    name: "John Smith",
    age: 15,
  },
  {
    id: 2,
    name: "John Smith",
    age: 15,
  }
]

router.get("/", (req, res) => {
  res.send(PRODUCTS)
})

router.post("/", (req, res) => {
  const product = req.body
  PRODUCTS.push(product)
  res.send(product)
})

router.get("/:id", (req, res) => {
  const id = parseInt(req.params["id"])
  const product =  PRODUCTS.find(p => p.id === id)
  res.send(product)
})

export default router