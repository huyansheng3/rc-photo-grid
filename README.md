# React photo-grid

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## A React component photo-grid like google search photo grid! inspired by the [blog](https://github.com/xieranmaya/blog/issues/4)

![demo](https://github.com/huyansheng3/react-photo-grid/raw/master/show.gif)

[live demo](https://huyansheng3.github.io/rc-photo-grid/index.html)

## API

PhotoGrid props

| name   | description       | type                                                                  | default |
| ------ | ----------------- | --------------------------------------------------------------------- | ------- |
| photos | photo list        | Array[String] or Arrary[{url: String, width: Number, height: Number}] | []      |
| unit   | photo height unit | Number                                                                | 200     |

you can install by run `npm i --save rc-photo-grid`

## example:

```
const cats = [
  {
    "url": "photo-103450229.jpg",
    "width": 675,
    "height": 900
  },
  {
    "url": "photo-108273877.jpg",
    "width": 1170,
    "height": 780
  },
  {
    "url": "photo-115203323.jpg",
    "width": 1170,
    "height": 780
  },
]

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
```

## Licensed

MIT

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
