module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@orders/shared': '../../packages/shared/src'
        }
      }
    ]
  ]
};
