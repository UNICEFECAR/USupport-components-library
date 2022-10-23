import React from "react";
import { BaseNavbar } from "./BaseNavbar";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Components Library/navbars/Navbar",
  component: BaseNavbar,
  argTypes: {},
};

const pages = [
  { name: "Home", url: "/", exact: true },
  { name: "How it works?", url: "/how-it-works" },
  { name: "About Us", url: "/about-us" },
  { name: "Information portal", url: "/information-portal" },
  { name: "Contact Us", url: "/contact-us" },
];

const countries = [
  {
    name: "Switzerland",
    flagName: "swiss",
    languages: ["German", "French", "Italian", "Romansh"],
  },
];

const Template = (props) => (
  <Router>
    <BaseNavbar pages={pages} countries={countries} {...props} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
