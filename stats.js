function calculateStats(commits) {
  const stats = {
    totalCommits: commits.length,
    authors: {},
    byDate: {},
    byHour: {},
    byWeekday: {}
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

    // hour stats
    const commitDate = new Date(commit.date);
    const hour = commitDate.getHours();
    if (!stats.byHour[hour]) {
      stats.byHour[hour] = 0;
    }
    stats.byHour[hour]++;

    // weekday stats
    const weekday = commitDate.getDay();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = weekdays[weekday];
    if (!stats.byWeekday[dayName]) {
      stats.byWeekday[dayName] = 0;
    }
    stats.byWeekday[dayName]++;
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

  console.log('\nCommits by weekday:');
  Object.entries(stats.byWeekday).forEach(([day, count]) => {
    console.log(`  ${day}: ${count}`);
  });

  console.log('\nMost active hours:');
  const hoursSorted = Object.entries(stats.byHour)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  hoursSorted.forEach(([hour, count]) => {
    console.log(`  ${hour}:00 - ${count} commits`);
  });
}

module.exports = { calculateStats, printStats };