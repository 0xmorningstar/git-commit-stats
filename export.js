const fs = require('fs');

function exportToJSON(stats, filename = 'stats.json') {
  try {
    fs.writeFileSync(filename, JSON.stringify(stats, null, 2));
    console.log(`Stats exported to ${filename}`);
  } catch (err) {
    console.error('Export failed:', err.message);
  }
}

function exportToCSV(commits, filename = 'commits.csv') {
  try {
    const header = 'Hash,Author,Email,Date,Message\n';
    const rows = commits.map(c =>
      `${c.hash},${c.author},${c.email},${c.date},"${c.message}"`
    ).join('\n');

    fs.writeFileSync(filename, header + rows);
    console.log(`Commits exported to ${filename}`);
  } catch (err) {
    console.error('Export failed:', err.message);
  }
}

module.exports = { exportToJSON, exportToCSV };