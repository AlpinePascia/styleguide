# A styleguide generator for Magento theme

1. Clone this repo to the root of project code folder, e.g. `{{project}}-project/{{project}}`

2. Run `npm i`

3. Start Magento's server (and deploy static files if they aren't there already)

4. Add configuration in config.js (see instructions in config.js.sample) or from command line running `gulp --theme {{themeName}} --vendor {{vendor}} --placeholder {{logo.svg}}`. (See details about args in config.js.sample)

5. Run `gulp` if you have the config.js all set up.
