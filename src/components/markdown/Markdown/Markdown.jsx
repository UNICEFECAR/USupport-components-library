import React from "react";
import propTypes from "prop-types";
import RectMarkdown from "react-markdown";
import DOMpurify from "dompurify";
import rehypeRaw from "rehype-raw";

import "./markdown.scss";

/**
 * Markdown
 *
 * Markdown component
 *
 * @return {jsx}
 */
export const Markdown = ({ markDownText }) => {
  return (
    <RectMarkdown rehypePlugins={[rehypeRaw]} className={"markdown"}>
      {DOMpurify.sanitize(markDownText)}
    </RectMarkdown>
  );
};

Markdown.propTypes = {
  /**
   * Size of the loading animation
   * */
  markDownText: propTypes.string,
};
