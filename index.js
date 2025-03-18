#!/usr/bin/env node

const { execSync } = require('child_process');
const { program } = require('commander');
const { calculateStats, printStats } = require('./stats');
const { exportToJSON, exportToCSV } = require('./export');
const { validatePath } = require('./utils');

function getGitLog(path = '.', options = {}) {
  try {
    let cmd = `git -C ${path} log --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso`;

    if (options.since) {
      cmd += ` --since="${options.since}"`;
    }
    if (options.until) {
      cmd += ` --until="${options.until}"`;
    }

    const output = execSync(cmd, { encoding: 'utf8' });
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

program
  .name('git-commit-stats')
  .description('Analyze git repository statistics')
  .version('0.1.0')
  .argument('[path]', 'path to git repository', '.')
  .option('-s, --since <date>', 'show commits more recent than date')
  .option('-u, --until <date>', 'show commits older than date')
  .option('--json <filename>', 'export stats to JSON file')
  .option('--csv <filename>', 'export commits to CSV file')
  .action((path, options) => {
    try {
      validatePath(path);

      const logs = getGitLog(path, options);
      if (logs.length === 0) {
        console.log('No commits found');
        return;
      }

      const commits = parseCommits(logs);
      const stats = calculateStats(commits);

      if (options.json) {
        exportToJSON(stats, options.json);
      }
      if (options.csv) {
        exportToCSV(commits, options.csv);
      }
      if (!options.json && !options.csv) {
        printStats(stats);
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  });

program.parse();