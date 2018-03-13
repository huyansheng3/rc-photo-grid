import React, { Component } from 'react'
import { render } from 'react-dom'
import PhotoGrid from '../../src'
import cats from './cats.json'

class Demo1 extends Component {
  render() {
    const photos = cats.map(
      cat => 'https://xieranmaya.github.io/images/cats/' + cat.url
    )
    return (
      <div>
        <h1>photo-grid Demo with url</h1>
        <PhotoGrid photos={photos} />
      </div>
    )
  }
}

class Demo2 extends Component {
  render() {
    const photos = cats.map(cat => ({
      ...cat,
      url: 'https://xieranmaya.github.io/images/cats/' + cat.url,
    }))
    return (
      <div>
        <h1>photo-grid Demo with url and size info</h1>
        <PhotoGrid photos={photos} />
      </div>
    )
  }
}

const App = props => {
  return (
    <div>
      <Demo1 />
      <Demo2 />
    </div>
  )
}

render(<App />, document.querySelector('#demo'))
