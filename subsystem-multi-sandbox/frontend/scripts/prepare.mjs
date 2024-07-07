import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join,resolve } from 'path';

function findGitRoot(directory) {
  const gitPath = join(directory,'.git');
  if(existsSync(gitPath)) {
    return directory;
  }
  const parentDirectory = resolve (directory, '..');
  if(parentDirectory === directory) {
    return null;
  }
  return findGitRoot(parentDirectory);
}

try {
  const frontendRoot = process.cwd();
  const gitRoot = findGitRoot(frontendRoot);

  if(gitRoot) {
    const huskyRoot = './' + frontendRoot.replace(gitRoot, '') + '/.husky';
    process.chdir(gitRoot);
    execSync(`husky install ${ huskyRoot }`, {stdio: 'inherit'});
  } else {
    console.error('No .git directory found');
  }
} catch(error) {
  console.error('Failed to install husky config',error);
}
