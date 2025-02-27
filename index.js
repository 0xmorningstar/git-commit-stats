#!/usr/bin/env node

const { execSync } = require('child_process');
const { program } = require('commander');
const { calculateStats, printStats } = require('./stats');

function getGitLog(path = '.') {
  try {
    const output = execSync(`git -C ${path} log --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso`, {
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

program
  .name('git-commit-stats')
  .description('Analyze git repository statistics')
  .version('0.1.0')
  .argument('[path]', 'path to git repository', '.')
  .action((path) => {
    const logs = getGitLog(path);
    const commits = parseCommits(logs);
    const stats = calculateStats(commits);
    printStats(stats);
  });

program.parse();