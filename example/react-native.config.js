const path = require('path');
const pak = require('../package.json');

module.exports = {
  dependencies: {
    'react-native-nearpay-sdk': {
      root: path.join(__dirname, '..'),
    },
  },
};
