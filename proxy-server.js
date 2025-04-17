const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://course-api.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/react-tours-project');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};