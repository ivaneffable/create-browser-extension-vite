# create-browser-extension-vite

A CLI for Creating Browser Extensions with TypeScript

## Quick Start

<img src="https://github.com/ivaneffable/create-browser-extension-vite/blob/main/screenshot.png?raw=true" width="500">

### Basic Usage

To create a new browser extension project:

```sh
npx create-browser-extension-vite <name>
```

### Initialize Git Repository

To automatically set up a Git repository during project creation:

```sh
npx create-browser-extension-vite <name> -g
```

### Auto-Install Dependencies

To install dependencies automatically after the project is created:

```sh
npx create-browser-extension-vite <name> -i
```

### Skip Prompts

To skip interactive prompts and use default settings:

```sh
npx create-browser-extension-vite <name> -i
```

---

## About the Browser Extension

This CLI generates a basic browser extension project using **TypeScript** and powered by **Vite**. Vite is used to transpile the TypeScript code into the plain JavaScript required by browser extension stores. The generated extension adheres to **Manifest Version 3** and includes only a **background script** for simplicity.
