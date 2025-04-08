const ProductsFilters = ({ fetchProducts, setLimit, setCategory, setSearch }) => {
  return (
    <div>
      <label htmlFor="limit-select">Products per page:</label>
      <select
        id="limit-select"
        onChange={event => {
          setLimit(event.target.value)
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        onChange={event => {
          setCategory(event.target.value)
        }}
      >
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="electronics">Electronics</option>
      </select>
      <label htmlFor="search-input">Search: </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search Products"
        onChange={event => {
          setSearch(event.target.value)
        }}
      ></input>
      <button onClick={fetchProducts}>🔎 Search</button>
    </div>
  )
}

export default ProductsFilters
