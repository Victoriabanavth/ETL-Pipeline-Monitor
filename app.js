/**
 * ETL Pipeline Monitor
 * Real-time dashboard for monitoring data pipeline health
 */

// Data sources configuration
const dataSources = [
    { name: 'PostgreSQL - Users', type: 'database', icon: '🐘', status: 'online', records: 1245678 },
    { name: 'MySQL - Transactions', type: 'database', icon: '🐬', status: 'online', records: 3456789 },
    { name: 'Salesforce API', type: 'api', icon: '☁️', status: 'online', records: 89234 },
    { name: 'Stripe Webhooks', type: 'api', icon: '💳', status: 'syncing', records: 234567 },
    { name: 'S3 - Logs', type: 'file', icon: '📦', status: 'online', records: 567890 },
    { name: 'Google Analytics', type: 'api', icon: '📊', status: 'online', records: 123456 },
    { name: 'CSV Uploads', type: 'file', icon: '📄', status: 'online', records: 45678 },
    { name: 'MongoDB - Events', type: 'database', icon: '🍃', status: 'online', records: 789012 }
];

// Active jobs
const activeJobs = [
    { name: 'user_data_sync', type: 'extract', source: 'PostgreSQL', progress: 78 },
    { name: 'transaction_agg', type: 'transform', source: 'MySQL', progress: 45 },
    { name: 'daily_metrics', type: 'transform', source: 'Analytics', progress: 92 },
    { name: 'sf_lead_import', type: 'extract', source: 'Salesforce', progress: 23 },
    { name: 'warehouse_load', type: 'load', source: 'Snowflake', progress: 67 }
];

// Log messages
const logMessages = [];
const logTypes = ['info', 'success', 'warning'];
const logTemplates = [
    { level: 'info', msg: 'Processing batch {batch} from {source}' },
    { level: 'success', msg: 'Completed sync for {source}: {count} records' },
    { level: 'info', msg: 'Starting transformation job: {job}' },
    { level: 'success', msg: 'Schema validation passed for {source}' },
    { level: 'warning', msg: 'Retry attempt 2/3 for {source}' },
    { level: 'info', msg: 'Writing {count} records to Snowflake' },
    { level: 'success', msg: 'Pipeline checkpoint saved' }
];

// Format number with K/M suffix
const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// Format time
const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
};

// Generate random log entry
const generateLog = () => {
    const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    const source = dataSources[Math.floor(Math.random() * dataSources.length)];

    let msg = template.msg
        .replace('{source}', source.name.split(' - ')[0])
        .replace('{batch}', Math.floor(Math.random() * 1000))
        .replace('{count}', formatNumber(Math.floor(Math.random() * 10000)))
        .replace('{job}', activeJobs[Math.floor(Math.random() * activeJobs.length)].name);

    return {
        time: formatTime(),
        level: template.level,
        message: msg
    };
};

// Update metrics with animation
const animateValue = (elementId, endValue, suffix = '') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const current = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(current + (endValue - current) * easeOut);

        element.textContent = formatNumber(value) + suffix;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

// Update metrics
const updateMetrics = () => {
    const baseRecords = 12500000;
    const throughput = 1500 + Math.floor(Math.random() * 1000);
    const latency = 45 + Math.floor(Math.random() * 30);
    const successRate = 99.2 + Math.random() * 0.7;

    animateValue('recordsProcessed', baseRecords + Math.floor(Math.random() * 100000));
    document.getElementById('throughput').textContent = formatNumber(throughput);
    document.getElementById('avgLatency').textContent = latency + 'ms';
    document.getElementById('successRate').textContent = successRate.toFixed(1) + '%';
};

// Update last update time
const updateTimestamp = () => {
    document.getElementById('lastUpdate').textContent = 'Updated: ' + formatTime();
};

// Render jobs list
const renderJobs = () => {
    const container = document.getElementById('jobsList');
    const jobCount = document.getElementById('jobCount');

    // Update progress randomly
    activeJobs.forEach(job => {
        job.progress = Math.min(100, job.progress + Math.floor(Math.random() * 5));
        if (job.progress >= 100) job.progress = Math.floor(Math.random() * 30);
    });

    jobCount.textContent = activeJobs.length + ' Running';

    container.innerHTML = activeJobs.map(job => `
    <div class="job-item">
      <div class="job-info">
        <div class="job-icon ${job.type}">${job.type === 'extract' ? '⬇️' :
            job.type === 'transform' ? '⚙️' : '📤'
        }</div>
        <div class="job-details">
          <span class="job-name">${job.name}</span>
          <span class="job-meta">${job.source}</span>
        </div>
      </div>
      <div class="job-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${job.progress}%"></div>
        </div>
        <span class="progress-text">${job.progress}%</span>
      </div>
    </div>
  `).join('');
};

// Add log entry
const addLog = () => {
    const log = generateLog();
    logMessages.unshift(log);

    // Keep only last 20 logs
    if (logMessages.length > 20) {
        logMessages.pop();
    }

    renderLogs();
};

// Render logs
const renderLogs = () => {
    const container = document.getElementById('logsContainer');

    container.innerHTML = logMessages.map(log => `
    <div class="log-entry">
      <span class="log-time">${log.time}</span>
      <span class="log-level ${log.level}">${log.level.toUpperCase()}</span>
      <span class="log-message">${log.message}</span>
    </div>
  `).join('');
};

// Clear logs
const clearLogs = () => {
    logMessages.length = 0;
    renderLogs();
};

// Render data sources
const renderSources = (filter = 'all') => {
    const tbody = document.getElementById('sourcesBody');

    const filtered = filter === 'all'
        ? dataSources
        : dataSources.filter(s => s.type === filter);

    tbody.innerHTML = filtered.map(source => {
        const latency = Math.floor(Math.random() * 100) + 20;
        const lastSync = Math.floor(Math.random() * 5) + 1;

        return `
      <tr>
        <td>
          <div class="source-name">
            <span class="source-icon">${source.icon}</span>
            <span>${source.name}</span>
          </div>
        </td>
        <td><span class="source-type">${source.type}</span></td>
        <td>
          <span class="source-status ${source.status}">
            <span class="status-dot" style="width: 6px; height: 6px; background: currentColor; border-radius: 50%; display: inline-block;"></span>
            ${source.status}
          </span>
        </td>
        <td>${lastSync}m ago</td>
        <td>${formatNumber(source.records)}</td>
        <td>${latency}ms</td>
      </tr>
    `;
    }).join('');
};

// Setup filter buttons
const setupFilters = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSources(btn.dataset.filter);
        });
    });
};

// Update flow rates
const updateFlowRates = () => {
    const rates = ['flowRate1', 'flowRate2', 'flowRate3'];
    rates.forEach(id => {
        const rate = (1 + Math.random() * 2).toFixed(1);
        document.getElementById(id).textContent = rate + 'K/s';
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    updateMetrics();
    updateTimestamp();
    renderJobs();
    renderSources();
    setupFilters();

    // Add initial logs
    for (let i = 0; i < 8; i++) {
        logMessages.push(generateLog());
    }
    renderLogs();

    // Start intervals
    setInterval(updateTimestamp, 1000);
    setInterval(updateMetrics, 3000);
    setInterval(renderJobs, 2000);
    setInterval(addLog, 4000);
    setInterval(updateFlowRates, 2500);
    setInterval(() => renderSources(document.querySelector('.filter-btn.active').dataset.filter), 5000);
});
