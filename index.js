const { execSync } = require('child_process');
const { calculateStats, printStats } = require('./stats');

function getGitLog() {
  try {
    const output = execSync('git log --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso', {
      encoding: 'utf8'
    });
    return output.split('\n').filter(line => line.trim());
  } catch (err) {
    console.error('Error reading git log:', err.message);
    return [];
  }
}

function parseCommits(logs) {
  return logs.map(log => {
    const [hash, author, email, date, message] = log.split('|');
    return { hash, author, email, date, message };
  });
}

// main
const logs = getGitLog();
const commits = parseCommits(logs);
const stats = calculateStats(commits);
printStats(stats);