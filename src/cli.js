import arg from "arg";
import chalk from "chalk";
import { confirm } from "@inquirer/prompts";

import { createProject } from "./main.js";

function showHelpIfRequested(options) {
  if (options.help) {
    console.log(
      chalk.green(`
      Usage
        $ create-browser-extension-vite <project-name>

      Options
        --git          Initialize a git repository
        --yes          Skip prompts
        --install      Install dependencies
        --help         Display this message
    `)
    );
    process.exit(0);
  }
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return options;
  }

  return {
    ...options,
    git:
      options.git ||
      (await confirm({ message: "Initialize a git repository?" })),
  };
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--help": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-h": "--help",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    runInstall: args["--install"] || false,
    help: args["--help"] || false,
    projectName: args._[0],
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  showHelpIfRequested(options);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
