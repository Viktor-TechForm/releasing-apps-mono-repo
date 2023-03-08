/**
 *
 * @param {string} cmd
 * @param {import('@actions/exec')} exec
 * @returns
 */
function promisedExec(cmd, exec) {
  return new Promise((resolve, reject) => {
    exec.exec(cmd, undefined, {
      listeners: {
        stderr: data => reject(data),
        stdout: data => resolve(data),
      },
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
  const now = new Date().toISOString();
  const affectedPackages = await promisedExec(
    `pnpm list -r --depth -1 --filter=[${process.env.LAST_RELEASE_SHA}]`,
    exec,
  );
  console.log('affected packages', affectedPackages);
  await github.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: `dev-${now}`,
    prerelease: true,
    name: `Dev-${now}`,
    body: `## Released packages
*ignore mobile apps*

${affectedPackages}`,
  });
  console.log('created release');
};
