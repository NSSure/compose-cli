#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

yargs.command({
    command: 'initialize <type>',
    aliases: ['init'],
    desc: 'Scaffolds the a default project structure for the given project type',
    builder: (yargs) => {
        yargs.positional('type', {
            describe: 'Type of project to be scaffolded.',
            type: 'string'.anchor
        })
    },
    handler: (argv) => {
        switch(argv.type.toLowerCase()) {
            case "ts":
                let bat = path.join(__dirname, 'typescript-scaffold/scaffold.bat');
                let scaffoldProcess = exec(bat);
                scaffoldProcess.stdout.pipe(process.stdout);
                break;
            default:
                console.error(chalk.red('Please provided a valid type value.'));
                break;
        }
    }
})
.help()
.argv;