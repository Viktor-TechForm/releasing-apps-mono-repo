const rootProjectName = 'releasing-apps-mono-repo';

/**
 *
 * @param {string} cmd
 * @param {import('@actions/exec')} exec
 * @returns {Promise<string>}
 */
function promisedExec(cmd, exec) {
  return new Promise((resolve, reject) => {
    exec.exec(cmd, undefined, {
      listeners: {
        stderr: data => reject(data.toString()),
        stdout: data => resolve(data.toString()),
      },
      silent: true,
    });
  });
}

/**
 * @typedef Params
 * @type {object}
 * @property {import('@octokit/rest').Octokit} github
 * @property {typeof import('@actions/github').context} context
 * @property {typeof import('@actions/exec')} exec
 */

/**
 *
 * @param {Params} param0
 * @returns
 */
module.exports = async ({github, context, exec}) => {
  const now = new Date().toISOString().replace(/:/g, '-');
  const affectedPackages = await promisedExec(
    `pnpm list -r --depth -1 --filter=[${process.env.LATEST_RELEASE_SHA}] --json`,
    exec,
  );
  // pnpm list -r can output [{name: 'workspace1'}][{name: 'workspace2'}] if there are multiple projects in the folder, which aren't part of the same workspace
  // this will cause json.parse to fail, but shouldn't happen as every project should be included in pnpm-workspace.yaml
  /** @type {Array<object>} */
  const packages = JSON.parse(affectedPackages);
  if (packages.length < 1) {
    console.log('No affected packages, skipping github tag and release');
    return 0;
  }

  if (packages.every(project => project.name === rootProjectName)) {
    console.log(
      'The only affected package was root, skipping github tag and release',
    );
    return 0;
  }

  console.log('affected packages', packages);

  const body = `## Released packages
*ignore mobile apps*

${packages.map(item => `- ${item.name}`).join('\n')}`;

  await github.rest.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: `dev-${now}`,
    prerelease: true,
    name: `Dev-${now}`,
    body,
  });
  console.log('created release');
  return 0;
};
