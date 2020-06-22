/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

//test needs to add virtual store, etc to correct error
xdescribe('AllProducts', () => {
  let allProducts
  const name = 'Super Color Flashy Polish'
  const description = 'The flash that is gonna get you in the door!'
  const price = 1000000
  const colorFamily = 'red'
  const stock = 1
  const fakeProduct = {
    name,
    description,
    price,
    colorFamily,
    stock
  }
  beforeEach(() => {
    let fakeProducts = [fakeProduct, fakeProduct]
    allProducts = shallow(<AllProducts products={fakeProducts} />)
  })

  it('renders the first product name in an h2', () => {
    expect(allProducts.find('h2').text()).to.be.equal(name)
  })
})
