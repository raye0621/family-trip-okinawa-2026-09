import type { NextConfig } from 'next';
import { execFileSync } from 'node:child_process';

function getCommitVersion() {
  const configuredVersion = process.env.NEXT_PUBLIC_BUILD_VERSION;
  if (configuredVersion) return configuredVersion;

  let commitDate = new Date();
  try {
    const commitTimestamp = execFileSync('git', ['show', '-s', '--format=%ct', 'HEAD'], { encoding: 'utf8' }).trim();
    commitDate = new Date(Number(commitTimestamp) * 1000);
  } catch {
    // Build archives without Git metadata fall back to their build time.
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(commitDate);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';

  return `1.${value('year')}.${value('month')}${value('day')}.${value('hour')}${value('minute')}`;
}

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSite = repositoryName.endsWith('.github.io');
const basePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserSite
  ? `/${repositoryName}`
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BUILD_VERSION: getCommitVersion(),
  },
};

export default nextConfig;
