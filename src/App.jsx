import { useEffect, useState } from "react"
import "./App.css"
import Product from "./components/Product"
import { PacmanLoader } from "react-spinners"
import "bootstrap/dist/css/bootstrap.min.css"
import { Alert } from "react-bootstrap"
import ProductsFilters from "./components/ProductsFilters"
import NewComponentForm from "./components/NewComponentForm"

function App() {
  const [isNewProduct, setIsNewProduct] = useState(true)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProducts, setShowProducts] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Teniamo traccia tramite stato dello stato dei filtri di <ProductsFilters>
  const [limit, setLimit] = useState(20)
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:3001/products?limit=" + limit
      if (category) url += "&category=" + category
      if (search) url += "&title=" + search

      setLoading(true)
      const response = await fetch(url)
      const products = await response.json()
      if (!response.ok) throw new Error("HTTP ERROR!")
      setProducts(products)
    } catch (error) {
      console.log(error)
      setError("Errore durante il fetch dei prodotti")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [limit, category])

  const handleSelect = selected => {
    setSelectedProduct(selected)
  }

  if (isNewProduct) return <NewComponentForm />

  return (
    <>
      <ProductsFilters fetchProducts={fetchProducts} setLimit={setLimit} setCategory={setCategory} setSearch={setSearch} />
      {loading && <PacmanLoader />}
      {error && <Alert>❌ Error: {error}</Alert>}
      {!error && (
        <button
          onClick={() => {
            setShowProducts(() => !showProducts)
          }}
        >
          SHOW PRODUCTS
        </button>
      )}

      {!error && showProducts && products.length > 0
        ? products.map(product => <Product key={product.id} {...product} selectedProduct={selectedProduct} handleSelect={handleSelect} />)
        : !error && <div>NO PRODUCTS FOUND</div>}
    </>
  )
}

export default App
