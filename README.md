# BOLO Flier Creator Version 3

This project is the third iteration of the BOLO Flier Creator application
concepted by the Pinecrest Police Department in Miami, Florida.  The third
version aims to re-engineer the application for security and scalability
through the use of newer technologies both in hardware and software.

The current application stack consists of:

- [Node.js](http://nodejs.org)
- [Express](http://expressjs.com)
- [IBM Bluemix PaaS](http://www.ibm.com/cloud-computing/bluemix)
- [Cloudant](http://cloudant.com)


## How to use

Not much here yet.  Stay tuned!


## Development Notes

### Secrets
In order for the application to run on a local machine your development
environment needs to have specific Cloudant credentials set. All you need to
do is save a file named .env in your project root with the needed environment
variables set. Check the .env.example file to see the format and variables
used in this project.  **Do not edit the .env.example file and/or commit it.**


### Testing
This project is using the following libraries for testing:

* [Mocha Test Runner](https://mochajs.org/)
* [Chai Assertion Library](http://chaijs.com/)
* [Sinon.JS Test Double Library](http://sinonjs.org)
* [Mockery - Node.js require() Mocking Library](https://github.com/mfncooper/mockery)

The project is set up for an effective BDD/TDD workflow. Tests are contained
in the test/ directory which contain directories for unit, functional, and
acceptance tests.

To execute Functional and Unit tests with coverage reports:  
`npm test`

Coverage reports are stored in `./coverage` directory.

To run individual tests:  
`mocha test/unit` -or- `npm run unit-test`  
`mocha test/functional`

The --watch flag can be used to watch for any changes to tests during
development:  
`mocha --watch test/unit`  
`mocha --watch test/functional`

Note that acceptance tests have not been implemented yet. The project plans
to use WebDriver for accpetance tests against user story scenarios. Changes
to these plans will be noted as needed.


## Documentation

The project requires all source code to be documented using
[JSDoc](http://usejsdoc.org) in order to generate documentation.

### Generating Documentation
Generating the documentation is easy! Make sure that JSDoc is installed by
using the `npm install` command. Then type `npm run docs` and that's it.
Open jsdoc/index.html file in your browser to read. Enjoy.
