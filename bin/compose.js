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
                const fs = require('fs');
                const requiredDirs = ['./src', './dist'];

                console.log(__dirname);

                let rootDir = path.join(__dirname, 'typescript-scaffold');

                // Create required directories if they do not exist yet.
                requiredDirs.forEach((requiredDir) => {
                    if (!fs.existsSync(requiredDir)) {
                        fs.mkdirSync(requiredDir);
                    }
                });

                const fileHandler = (error) => {
                    if (error) {
                        throw error;
                    }

                    console.log('Default installation file was copied to target directory successfully.');
                };

                // Copy default installation files into project directory.
                fs.copyFile(path.join(rootDir, '.gitignore'), path.join(__dirname, '/../.gitignore'), fileHandler);
                fs.copyFile(path.join(rootDir, 'main.ts'), path.join(__dirname, '/../src/main.ts'), fileHandler);
                fs.copyFile(path.join(rootDir, 'webpack.config.js'), path.join(__dirname, '/../webpack.config.js'), fileHandler);

                // Run the bat file it initialize npm, installs default packages, and configures typescript.
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