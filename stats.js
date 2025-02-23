function calculateStats(commits) {
  const stats = {
    totalCommits: commits.length,
    authors: {},
    byDate: {}
  };

  commits.forEach(commit => {
    // author stats
    if (!stats.authors[commit.author]) {
      stats.authors[commit.author] = {
        count: 0,
        email: commit.email
      };
    }
    stats.authors[commit.author].count++;

    // date stats
    const date = commit.date.split(' ')[0];
    if (!stats.byDate[date]) {
      stats.byDate[date] = 0;
    }
    stats.byDate[date]++;
  });

  return stats;
}

function printStats(stats) {
  console.log('\n=== Commit Statistics ===');
  console.log(`Total commits: ${stats.totalCommits}\n`);

  console.log('By author:');
  Object.entries(stats.authors).forEach(([author, data]) => {
    console.log(`  ${author}: ${data.count} commits`);
  });
}

module.exports = { calculateStats, printStats };