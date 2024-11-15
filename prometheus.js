const promClient = require('prom-client');

// Create a Registry
const register = new promClient.Registry();

// Default metrics (nodejs, process stats)
promClient.collectDefaultMetrics({ register });

// Custom Histogram to measure work durations
const workDurationHistogram = new promClient.Histogram({
  name: 'app_work_duration_seconds',
  help: 'Histogram for the duration of /work endpoint',
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// Custom Counter for HTTP requests
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Middleware for counting HTTP requests
const countRequests = (req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.url,
      status_code: res.statusCode,
    });
  });
  next();
};

// Function to record work duration
const recordWorkDuration = (duration) => {
  workDurationHistogram.observe(duration / 1000); // Convert ms to seconds
};

module.exports = {
  register,
  countRequests,
  recordWorkDuration,
};
