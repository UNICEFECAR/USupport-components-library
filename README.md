# Welcome

Repository for the USupport Components Library.

## Usage

The USupport Components Library will be used as a gitsubmodule library within all the Web UI interfaces of the USuppoort project.

# Contribute

## Installation

To clone the source code use:

```
git clone git@github.com:UNICEFECAR/USupport-components-library.git
```

To install all the dependencies use:

```
npm install
```

The USupport Components Library is run using the Storybook package that allows to preview components in isolation. For more information about Storybook please see the documentation https://storybook.js.org/docs/react/get-started/introduction.

To run the project use:

```
npm run storybook
```

## Adding a new component to the USupport Components Library

To create a new component, please use the provided bash script `create-component.bash`. By executing the following command from the root directory of the project:

```
chmod +x create-component.bash
./create-component.bash
```

Then, you will be prompted to provide component name, component description, and component group to which the component belongs.

## Please follow these naming conventions for your branches

- Features `feature/{JIRA_ID}-{branch_name}
- Bugs `bug/{JIRA_ID}-{branch_name}
- Hotfixes `hotfix/{JIRA_ID}-{branch_name}

## Guidelines for writing a commit message when committing changes to the USupport Components Library

- Create: `[commit message]` (create a new component)
- Add: `[commit message]` (addition to an existing component)
- Fix: `[commit message]` (fix a bug within an existing component)
- Refactor: `[commit message]` (refactor an existing component)
