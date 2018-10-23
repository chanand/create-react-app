'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const findWorkspace = dir => {
  const parent = path.resolve(dir, '..');

  if (!parent) {
    return null;
  }

  const packageJsonPath = path.resolve(parent, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    const { workspaces } = packageJson;

    if (!workspaces) {
      return null;
    }

    const paths = workspaces.map(workspace =>
      path.resolve(parent, workspace).replace(/\/\*$/, '')
    );

    return paths;
  }

  return findWorkspace(parent);
};

const workspaces = findWorkspace(appDirectory);

module.exports = {
  workspaces,
};
