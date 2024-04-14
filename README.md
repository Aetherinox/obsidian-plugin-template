<p align="center"><img src="https://github.com/Aetherinox/obsidian-plugin-template/assets/118329232/106bcb32-6c6f-423c-a8c6-c6aee3d31c65" width="860"></p>
<h1 align="center"><b>Obsidian Plugin Template</b></h1>

<div align="center">

![Version](https://img.shields.io/github/v/tag/Aetherinox/obsidian-plugin-template?logo=GitHub&label=version&color=ba5225) ![Downloads](https://img.shields.io/github/downloads/Aetherinox/obsidian-plugin-template/total) ![Repo Size](https://img.shields.io/github/repo-size/Aetherinox/obsidian-plugin-template?label=size&color=59702a) ![Last Commit)](https://img.shields.io/github/last-commit/Aetherinox/obsidian-plugin-template?color=b43bcc)

</div>

<br />

---

<br />

# About
This is a NodeJS application template which includes the following:

<br />

- @rollup/plugin-commonjs
- @rollup/plugin-image
- @rollup/plugin-node-resolve
- @rollup/plugin-replace
- @rollup/plugin-terser
- @rollup/plugin-typescript
- typescript
- tslib
- rollup
- rollup-plugin-license
- semver
- uuid

<br />

---

<br />

# How to Use
This template makes life as easy as it can get to develop your first [Obsidian.md](https://obsidian.md) plugin.

- Download the files from this repo into a folder
- Install [NodeJS](https://nodejs.org/en/download) on your system.
- Open a command prompt / terminal in the folder where you placed the templates and execute:

```shell
npm install
```

<br />

All of the packages for this template will be installed in your project folder which may take a minute or two.

Once the files are downloaded, simply open `src\main.ts` and begin writing your code.

<br />

To start off, include the methods from Obsidian that you'll need at the top of your `main.ts` file. The following is an example, but you can remove any of the modules you do not need.

<br />

```javascript
import { App, Plugin, WorkspaceLeaf, Debouncer, debounce, TFile, Menu, MarkdownView, PluginManifest, Notice, requestUrl, addIcon, ObsidianProtocolData, ItemView, View } from 'obsidian'
```

<br />

Once you have added some code and are ready to build, go back to your command prompt / terminal and run the following command in your profile folder:

```shell
npm run build
```

<br />

This will generate your `main.js` file which is what you will release to people who wish to use your plugin.

<br />

To make a `styles.css`, you must create that manually, these scripts do not cover that aspect.

<br />

---

<br />

# package.json
The `package.json` file is what controls many details about your plugin, including the name, description, and what packages your plugin needs to fund.

<br />

## Customization
You will need to open the `package.json` and change all of the information to fit your plugin's name / information.


```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "What your plugin does",
  "main": "main.js",
  "author": "Your Name <email@domain.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/YourGithubName/repo_name.git"
  }
}
```

<br />

## Dependencies
These are the packages that your plugin will need to run. There are two different sets of dependencies:

### Public Dependencies
These are the packages that the published plugin will need to run. They can be specified within the `dependencies` table in your `package.json` file:

```json
"dependencies": {
    "semver": "^7.6.0",
    "uuid": "^9.0.1"
}
```

<br />

You can install new dependencies by opening your Command prompt / terminal in the root folder of your project and running the command

```shell
npm install <packagename>
```

<br />

You can uninstall a dependency with:

```shell
npm uninstall <packagename>
```

<br />

### Dev Dependencies
These are the packages that are needed for you as the developer when you are creating your plugin. The end-user will not need these.

```json
  "devDependencies": {
    "obsidian": "^1.0.0",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-image": "^3.0.3",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-replace": "^5.0.5",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^11.1.6",
    "rollup": "^4.14.2",
    "rollup-plugin-license": "^3.3.1",
    "@types/node": "^20.12.7",
    "@types/semver": "^7.5.8",
    "@types/uuid": "^9.0.8",
    "tslib": "^2.6.2",
    "typescript": "^5.4.5"
  },
  ```

  <br />

  To install dev dependencies, you can run the command

```shell
npm install <packagename --save-dev
```

<br />

You can uninstall a dev dependency with:

```shell
npm uninstall <packagename> --save-dev
```

<br />

> [!IMPORTANT]
> Do not uninstall any `devDependencies` packages that are included with this NodeJS template, otherwise certain features may not work.

<br />

---

<br />

# Commands
As covered in the previous sections above, there are more commands that you should remember:

<br />

## npm run dev
Starts a developer instance of node. Every time you make a change to your `main.ts`, it will immediately be re-built and the changes will appear right away. You do not need to run any other command after making a change:

<br />

```shell
npm run dev
```

<br />

## npm run build
This command should be ran once you are finished writing your plugin, and no more changes are needed. These are the files that the end-user should get.

<br />


```shell
npm run build
```

<br />

## npm run version
Returns the version of your plugin

<br />


```shell
npm run version
```

<br />

## npm run guid
The `GUID` is a unique identifying number associated to your plugin. It will always remain the same and is generated based on the name of your plugin. If you change your plugin's name, the GUID will change.

Example: `2f226c46-c2b5-598f-b57e-b6ab2e1985db`

This command will return the assigned  `guid` for your plugin.

<br />


```shell
npm run uuid
```

<br />

## npm run uuid
The UUID is a unique identifying number associated to each release of your plugin. It is determined by the time of day when the plugin is released. The UUID is generated when you run the command `npm run build`.

Example: `0a7f5dc4-b2fa-5064-9e54-f6e17fd14273`

This command will return the assigned  `uuid` for the current release of your plugin.

<br />


```shell
npm run uuid
```
