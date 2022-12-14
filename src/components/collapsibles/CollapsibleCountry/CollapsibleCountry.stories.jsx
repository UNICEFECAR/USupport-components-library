import React from "react";

import { CollapsibleCountry } from "./CollapsibleCountry";

export default {
  title: "Components Library/collapsibles/CollapsibleCountry",
  component: CollapsibleCountry,
  argTypes: {},
};

const country = {
  name: "Kazakhstan",
  flagName: "KZ",
  languages: ["German", "French", "Italian", "Romansh"],
};

const Template = () => <CollapsibleCountry country={country} />;

export const Default = Template.bind({});
Default.args = {};
