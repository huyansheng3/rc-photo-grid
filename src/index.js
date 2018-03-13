import React, { Component } from 'react'
import classnames from 'classnames'
import {
  isRequired,
  number,
  string,
  array,
  arrayOf,
  oneOfType,
  shape,
} from 'prop-types'
import './index.css'

function getRealImgDimension(url) {
  if (typeof window !== 'undefined') {
    let image = new Image()
    image.src = url
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve({
          url,
          width: image.width,
          height: image.height,
        })
      }
      image.onerror = () => {
        reject()
      }
    })
  }
  return Promise.resolve({
    url,
    width: 1,
    height: 1,
  })
}

function isString(str) {
  return typeof str === 'string'
}

class PhotoGrid extends Component {
  static defaultProps = {
    unit: 200,
    photos: [],
  }

  static propTypes = {
    className: string,
    unit: number.isRequired,
    photos: oneOfType([
      arrayOf(string).isRequired,
      arrayOf(
        shape({
          url: string.isRequired,
          width: number.isRequired,
          height: number.isRequired,
        })
      ).isRequired,
    ]),
  }

  state = { photoInfos: [] }

  renderPhotos(photoInfos) {
    const { unit, className } = this.props
    const photoGridCls = classnames('photo-grid', className)
    return (
      <div className={photoGridCls}>
        {photoInfos.map(photoInfo => {
          const { width, height, url } = photoInfo
          return (
            <div
              className="photo-grid-wrapper"
              key={url}
              style={{
                width: height ? width / height * unit : 0,
                flexGrow: height ? width / height * unit : 0,
              }}>
              <i
                style={{
                  paddingBottom: `${width ? height / width * 100 : 0}%`,
                }}
              />
              <img src={url} />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { photos } = this.props
    if (isString(photos[0])) {
      return this.renderPhotos(this.state.photoInfos)
    }
    return this.renderPhotos(photos)
  }

  loadImages() {
    this.props.photos.forEach(photo =>
      getRealImgDimension(photo).then(photoInfo => {
        this.setState(prevState => {
          return { photoInfos: [...prevState.photoInfos, photoInfo] }
        })
      })
    )
  }

  componentDidMount() {
    const { photos } = this.props
    if (isString(photos[0])) {
      this.loadImages()
    }
  }
}

export default PhotoGrid
