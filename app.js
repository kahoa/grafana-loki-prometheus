const express = require('express');
const promClient = require('./prometheus');
const logger = require('./logger');

const app = express();
const PORT = 3000;

// Middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, world! This app logs and exposes metrics!');
});

// Simulate CPU-intensive work
app.get('/work', (req, res) => {
  const start = Date.now();
  for (let i = 0; i < 1e6; i++) {} // Dummy work
  const duration = Date.now() - start;
  promClient.recordWorkDuration(duration);
  res.send(`Work done in ${duration}ms`);
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Start the app
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
