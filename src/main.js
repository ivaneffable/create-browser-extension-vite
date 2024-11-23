import chalk from "chalk";
import ncp from "ncp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { execa } from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";

const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  await copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
  await fs.promises.rename(
    `${options.projectName}/gitignore.tmp`,
    `${options.projectName}/.gitignore`
  );
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.projectName || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../template"
  );
  options.templateDirectory = templateDir;

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined,
    },
  ]);

  await tasks.run();
  console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}
