#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");

const { caretify } = require("./index.js");

const main = async (args) => {
    try {
        caretify({
            packageJson: args.packageJson,
            yarnLock: args.yarnLock,
            indent: args.indent,
        });
    } catch (e) {
        console.error(e);
        process.exitCode = 1;
    }
};

main(
    yargs
        .usage("Usage: $0")
        .options({
            packageJson: {
                alias: "p",
                describe:
                    "package.json file to change. Defaults to ./package.json",
                default: path.join(process.cwd(), "package.json"),
            },
            yarnLock: {
                alias: "y",
                describe: "yarn.lock file to change. Defaults to ./yarn.lock",
                default: path.join(process.cwd(), "yarn.lock"),
            },
            indent: {
                alias: "i",
                describe: "Space indentation to use. Defaults to 4",
                default: 4,
            },
        })
        .help("h")
        .alias("h", "help").argv
);
