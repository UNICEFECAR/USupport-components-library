# Welcome

Repository for the USupport Components Library.

## Usage

The USupport Components Library is deployed as an npm package called `usupport-components-library` (https://github.com/UNICEFECAR/USupport-components-library). It can be used as a standard npm package:

```
npm i usupport-components-library
```

# Contribute

## Installation

This is the USupport Components Library that will be used within all the USupport interfaces.

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

## Creating a new component to the USupport Components Library

To create a new component, please use the provided bash script `create-component.bash`. By executing the following command from the root directory of the project:

```
chmod +x create-component.bash
./create-component.bash
```

Then, you will be prompted to provide component name, component description, and component group to which the component belongs.

The steps which the bash script executes are the following:

1. If the new component belongs to an already existing component group (e.g., `buttons`) then create a directory under that group with the name of the new component (PascalCase naming convention). Otherwise, create a new directory for the component group under the `components` directory (flatcase/mumblecase naming convention) and also export it within the `index.js` file residing in `/src`. Then, as above, create a directory under the newly created group using the name of the new component.

2. Once the component directory is created, the next step is to create four files:

- `NewComponent.jsx` (the actual component itself - `PascalCase`)
- `new-component.scss` (the styling file for the component - `caterpillar-case`)
- `NewComponent.stories.jsx` (the stories file used to configure the component for use within the storybook - `PascalCase`)
- `index.js` (export the component)

3. Once the component is created it needs to be exported, using the `index.js` file residing in the same directory as the component group (just outside of the newly created component directory).

Note: For more information on directory structure, conventions, and sample components, please refer to the `/src/component/examples` directory.

## Guidelines for writing a commit message when committing changes to the USupport Components Library

- Create: `[commit message]` (create a new component)
- Add: `[commit message]` (addition to an existing component)
- Fix: `[commit message]` (fix a bug within an existing component)
- Refactor: `[commit message]` (refactor an existing component)
