import React from "react";
import { Navbar } from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Components Library/navbars/Navbar",
  component: Navbar,
  argTypes: {},
};

const pages = [
  { name: "Home", url: "/", exact: true },
  { name: "How it works?", url: "/how-it-works" },
  { name: "About Us", url: "/about-us" },
  { name: "Information portal", url: "/information-portal" },
  { name: "Contact us", url: "/contact-us" },
];

const countries = [
  {
    name: "Kazakhstan",
    flagName: "KZ",
    languages: ["German", "French", "Italian", "Romansh"],
  },
];

const Template = (props) => (
  <Router>
    <Navbar pages={pages} countries={countries} {...props} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
