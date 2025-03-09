# Git Commit Stats

A simple command-line tool for analyzing git repository statistics.

## Installation

```bash
npm install
```

## Usage

Basic usage:
```bash
node index.js
```

Analyze a specific repository:
```bash
node index.js /path/to/repo
```

Filter by date range:
```bash
node index.js --since "2024-01-01" --until "2024-12-31"
```

Export to JSON:
```bash
node index.js --json output.json
```

Export to CSV:
```bash
node index.js --csv commits.csv
```

## Options

- `-s, --since <date>` - Show commits more recent than date
- `-u, --until <date>` - Show commits older than date
- `--json <filename>` - Export statistics to JSON file
- `--csv <filename>` - Export commits to CSV file

## Features

- Parse git commit history
- Calculate statistics per author
- Filter commits by date range
- Export data to JSON or CSV formats