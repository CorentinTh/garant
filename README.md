<p align="center">
    <a href="https://www.npmjs.com/package/garant"><img alt="npm" src="./.github/logo.png"></a>
    <a href="https://github.com/CorentinTh/garant/actions"><img src="https://github.com/CorentinTh/garant/workflows/Node%20CI/badge.svg" alt="Node CI"></a>
    <a href="https://codecov.io/gh/CorentinTh/bame"><img src="https://codecov.io/gh/CorentinTh/bame/branch/master/graph/badge.svg" alt="coverage badge"/></a>
    <a href="https://www.npmjs.com/package/garant"><img alt="npm" src="https://img.shields.io/npm/v/garant"></a>
    <a href="https://www.npmjs.com/package/garant"><img alt="npm" src="https://img.shields.io/npm/dw/garant"></a>
    <a href="LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/garant"></a>
</p>


Simple and lightweight javascript object schema validation library.

## Description

* **Lightweight**: when bundled with rollup and terser, the output weight less than 2kB (vs ~167kB for [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), 80 times ratio!) 
* **Modular**: easily create new checkers (see [here](#road_map))
* **Typescript support**

## Installation

**Garant** can be installed using yarn or npm.

```shell
npm install garant
# or
yarn add garant
```

## Usage
```javascript
import {Validator} from 'garant';
// or
const {Validator} = require('garant');

const schema = {
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
    },
    info: {
        type: 'object',
        children:{
            age: {
                type: 'number',
            },
            height: {
              type: 'number',
          }
        }
    }   
};

const validator = new Validator(schema);

const object = {
    username: 'Jane',
    email: 'jane@example.com',
    info: {
        age: 22,
        height: 165
    }
};

const results = validator.check(object);

// {
//     hasError: false,
//     messages: [],
//     data: {
//       username: 'Jane',
//       email: 'jane@example.com',
//       info: {
//           age: 22,
//           height: 165
//       }
//     }
// }

```

## Road map

- ~~**Required** checker~~
- ~~**Type** checker~~
- ~~**Children** checker~~
- Improve documentation
- **Default** checker (set default value if undefined)
- **Regex** checker
- **Length** (min, max) checker
- **Array content** checker

Want to add your *checker*? Simply create yours in the [src/checkers](./src/checkers) directory and register it in the Validator class. Submit your pull request! 

## Contribute
**Pull requests are welcome !** Feel free to contribute.

## Credits
Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

## License
This project is under the [MIT license](./LICENSE.md).
