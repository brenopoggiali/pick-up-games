const proxy = [
    {
      context: '/api',
      target: 'http://localhost:5000',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;