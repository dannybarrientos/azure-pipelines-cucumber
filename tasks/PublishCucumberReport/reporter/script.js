const { generate } = require('cucumber-html-reporter')
const rawMetadata = process.env.RAW_METADATA
const cucumberJunitConvert = require('cucumber-junit-convert')
const { join } = require('path')
const { existsSync } = require('fs')

const reportOpts = {
  name: process.env.REPORT_NAME,
  brandTitle: process.env.REPORT_TITLE,
  ...(rawMetadata && {
      metadata: JSON.parse(rawMetadata)
  }),
  theme: process.env.THEME,
  reportSuiteAsScenarios: process.env.REPORT_SUITES_AS_SCENARIOS,
  launchReport: false,
  output: process.env.OUTPUT_PATH,
  jsonDir: process.env.JSON_DIR
}

generate(reportOpts)

if (process.env.JUNIT) {
  const jsonReportPath = join(process.env.OUTPUT_PATH, 'cucumber.html.json')
  const jsonReportPath = join(process.env.OUTPUT_PATH, 'cucumber-junit.xml')

  if (existsSync(jsonReportPath)) {
    console.log(`Found report file located at ${jsonReportPath}`)
    console.log('Transforming JSON to JUnit XML')

    const formatOptions = {
      inputJsonFile: jsonReportPath,
      outputXmlFile: xmlReportPath
    }

    cucumberJunitConvert.convert(formatOptions)
    console.log(`JUnit report saved at ${xmlReportPath}`)
  } else {
    throw Error('Report file not found')
  }
}
