# A styleguide generator for Magento theme

1. Clone this repo to the root of project code folder, e.g. `{{project}}-project/{{project}}`

2. Run `npm i`

3. Start Magento's server (and deploy static files if they aren't there already)

4. Provide the necessary configuration in kss-config.json:
    - 'source' - a relative path to where files with kss markdown are to be found (e.g., `../app/design/frontend/{{Vendor}}/{{theme}}/web/scss/`)
    - 'destination' - a relative path to the project's pub folder (e.g., `.../../{{project}}-workplace/application/pub/styleguide`)
    - 'custom' - a url path to the static files generated by Magento (e.g., `static/{{versionNumber}}/frontend/{{Vendor}}/{{theme}}/{{languageCode}}`)

5. Run `gulp` (or whatever is the task to run the app in the gulpfile) 