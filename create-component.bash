#!/bin/bash

# Clear the screen
clear

# Read the component name from the user input
echo -n "Enter component name (CamelCase): "
read component_name

if [ -z "$component_name" ]; then
    echo "Component name is required"
    exit 1
fi

# Transform the first letter of the component name to uppercase
component_name=$(echo $component_name | tr '[:lower:]' '[:upper:]' | cut -c1)$(echo $component_name | cut -c2-)

# Transform the component name to lowercase
component_name_lower=$(echo $component_name | tr '[:upper:]' '[:lower:]')

# Read the description of the component from the user input
echo -n "Enter component description: "
read component_description

if [ -z "$component_description" ]; then
    echo "Component description is required"
    exit 1
fi

# Read the component group from the user input
echo -n "Enter component group (all lowercase): "
read component_group

if [ -z "$component_group" ]; then
    echo "Component group is required"
    exit 1
fi

# Transform the component group to all lowercase
component_group=$(echo $component_group | tr '[:upper:]' '[:lower:]')

# Check if the component group directory exists
if [ ! -d "src/components/$component_group" ]; then
    # Create the component group directory
    mkdir -p "src/components/$component_group"

    # Create the component group index file
    touch "src/components/$component_group/index.js"

    # Add the component group to the main index file
    echo "export * from './components/$component_group';" >> "src/index.js"
fi

# Check if the component directory already exists
if [ -d "src/components/$component_group/$component_name" ]; then
    echo "Component already exists. Please choose a different component name."
    exit 1
fi

# Create the component directory
mkdir "src/components/$component_group/$component_name"

# Create the component files
touch "src/components/$component_group/$component_name/index.js"
touch "src/components/$component_group/$component_name/$component_name.jsx"
touch "src/components/$component_group/$component_name/$component_name_lower.scss"
touch "src/components/$component_group/$component_name/$component_name.stories.jsx"

# Add the component to the component index file
echo "export * from './$component_name.jsx';" >> "src/components/$component_group/$component_name/index.js"

# Add the component to the component group index file
echo "export * from './$component_name';" >> "src/components/$component_group/index.js"


# Add the component to the main component file
echo "import React from 'react';
import PropTypes from 'prop-types';

import './$component_name_lower.scss';

/**
 * $component_name
 *
 * $component_description
 *
 * @return {jsx}
 */
export const $component_name = ({/* Add props here */}) => {
  return (
    <h1>
      $component_name Component
    </h1>
  );
};

$component_name.propTypes = {
  // Add propTypes here
};

$component_name.defaultProps = {
  // Add defaultProps here
};" >> "src/components/$component_group/$component_name/$component_name.jsx"

# Add the component to the stories file
echo "import React from 'react';

import { $component_name } from './$component_name';

export default {
  title: 'Components Library/$component_group/$component_name',
  component: $component_name,
  argTypes: {},
};

const Template = (args) => <$component_name {...props} />;

export const Default = Template.bind({});
Default.args = {};" >> "src/components/$component_group/$component_name/$component_name.stories.jsx"

# Output to the user's console
echo "Successfully created $component into src/components/$component_group"