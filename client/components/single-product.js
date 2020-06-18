import React from 'react'

export class SingleProduct extends React.Component {
  render() {
    return (
      <div>
        <div className="image-col">
          <img src={product.imageUrl} />
        </div>
        <div className="detail-col">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div>{product.price}</div>
          <label htmlFor="qty-select">Quantity: </label>
          <select onChange={handleSelect} name="quantity" id="qty-select">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <button type="button">Add To Cart</button>
        </div>
      </div>
    )
  }
}
