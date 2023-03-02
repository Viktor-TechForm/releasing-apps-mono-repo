# releasing-apps-mono-repo

TODO:

- [x] Create 2 apps in mono-repo (under same moniker e.g. `my-project`)
- [x] Use workflows like `mono-repo` to parse and extract name (and possibly version) and pass it to a reusable workflow
- [x] Run the reusable workflow in an environment `my-project` to get secrets
- [x] Do more name parsing, to get which type of project should be released (e.g. is it an app or a cdk backend?)
- [ ] Use fastlane in to get build-number (and maybe just print it)
  - The current implementation doesn't work, say we go from `1.9.0` to `1.10.0`, the new build number would be `1100`, but when we then introduce a major update the build number would be `200` which is less.
- [x] Get `release-android/ios-only` from somewhere
  - We can stop it manually for now if we don't want to upload it to one of the stores
- [ ] Release on every push to dev environments
  - Make sure a release isn't triggered when a `release-please` pull request is merged
  - Make sure the `nx affected` doesn't trigger for all projects when a root file is changed (for example when we change an eslint rule)
  - Currently the easiest way to exclude project from being automatically released is to not have the script called in the `release-dev.yml` (currently `release`), this needs to be heavily documented if we choose this implementation

## Notes

- NX does not have a problem with "missing" scripts when running a command like `nx affected` or `nx run-many`, but targeting a specific package like `nx run my-project-backend:release` will fail with an error if `my-project-backend` does not have a release script.
  - This might not mean we have to add "empty" scripts to all packages since we'll probably create individual release workflows for each project anyway

## Turborepo

- Should every sript be a pipeline in `turbo.json`?
  - It will enable caching and parallel execution, but some of those scripts won't benefit? stuff like an app release script
  - In CI every release script can just be a pnpm run
