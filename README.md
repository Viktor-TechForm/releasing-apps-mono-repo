# releasing-apps-mono-repo

TODO:

- [x] Create 2 apps in mono-repo (under same moniker e.g. `my-project`)
- [x] Use workflows like `mono-repo` to parse and extract name (and possibly version) and pass it to a reusable workflow
- [x] Run the reusable workflow in an environment `my-project` to get secrets
- [x] Do more name parsing, to get which type of project should be released (e.g. is it an app or a cdk backend?)
- [x] Use fastlane in to get build-number (and maybe just print it)

## Notes

- NX does not have a problem with "missing" scripts when running a command like `nx affected` or `nx run-many`, but targeting a specific package like `nx run my-project-backend:release` will fail with an error if `my-project-backend` does not have a release script.
  - This might not mean we have to add "empty" scripts to all packages since we'll probably create individual release workflows for each project anyway
