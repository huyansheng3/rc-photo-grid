var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classnames from 'classnames';
import { isRequired, number, string, array, arrayOf, oneOfType, shape } from 'prop-types';
import './index.css';

function getRealImgDimension(url) {
  if (typeof window !== 'undefined') {
    var image = new Image();
    image.src = url;
    return new Promise(function (resolve, reject) {
      image.onload = function () {
        resolve({
          url: url,
          width: image.width,
          height: image.height
        });
      };
      image.onerror = function () {
        reject();
      };
    });
  }
  return Promise.resolve({
    url: url,
    width: 1,
    height: 1
  });
}

function isString(str) {
  return typeof str === 'string';
}

var PhotoGrid = (_temp2 = _class = function (_Component) {
  _inherits(PhotoGrid, _Component);

  function PhotoGrid() {
    var _temp, _this, _ret;

    _classCallCheck(this, PhotoGrid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { photoInfos: [] }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PhotoGrid.prototype.renderPhotos = function renderPhotos(photoInfos) {
    var _props = this.props,
        unit = _props.unit,
        className = _props.className;

    var photoGridCls = classnames('photo-grid', className);
    return React.createElement(
      'div',
      { className: photoGridCls },
      photoInfos.map(function (photoInfo) {
        var width = photoInfo.width,
            height = photoInfo.height,
            url = photoInfo.url;

        return React.createElement(
          'div',
          {
            className: 'photo-grid-wrapper',
            key: url,
            style: {
              width: height ? width / height * unit : 0,
              flexGrow: height ? width / height * unit : 0
            } },
          React.createElement('i', {
            style: {
              paddingBottom: (width ? height / width * 100 : 0) + '%'
            }
          }),
          React.createElement('img', { src: url })
        );
      })
    );
  };

  PhotoGrid.prototype.render = function render() {
    var photos = this.props.photos;

    if (isString(photos[0])) {
      return this.renderPhotos(this.state.photoInfos);
    }
    return this.renderPhotos(photos);
  };

  PhotoGrid.prototype.loadImages = function loadImages() {
    var _this2 = this;

    this.props.photos.forEach(function (photo) {
      return getRealImgDimension(photo).then(function (photoInfo) {
        _this2.setState(function (prevState) {
          return { photoInfos: [].concat(prevState.photoInfos, [photoInfo]) };
        });
      });
    });
  };

  PhotoGrid.prototype.componentDidMount = function componentDidMount() {
    var photos = this.props.photos;

    if (isString(photos[0])) {
      this.loadImages();
    }
  };

  return PhotoGrid;
}(Component), _class.defaultProps = {
  unit: 200,
  photos: []
}, _temp2);
PhotoGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  className: string,
  unit: number.isRequired,
  photos: oneOfType([arrayOf(string).isRequired, arrayOf(shape({
    url: string.isRequired,
    width: number.isRequired,
    height: number.isRequired
  })).isRequired])
} : {};


export default PhotoGrid;