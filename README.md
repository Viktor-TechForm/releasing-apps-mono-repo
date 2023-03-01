# releasing-apps-mono-repo

TODO:

- [ ] Create 2 apps in mono-repo (under same moniker e.g. `my-project`)
- [ ] Use workflows like `mono-repo` to parse and extract name (and possibly version) and pass it to a reusable workflow
- [ ] Run the reusable workflow in an environment `my-project` to get secrets
- [ ] Do more name parsing, to get which type of project should be released (e.g. is it an app or a cdk backend?)
- [ ] Use fastlane in to get build-number (and maybe just print it)
