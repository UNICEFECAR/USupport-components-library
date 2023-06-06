import React from "react";
import propTypes from "prop-types";
import ReactMarkdown from "react-markdown";
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
  const linkRenderer = (props) => {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="markdown-link"
        skipHtml={false}
      >
        {props.children}
      </a>
    );
  };
  return (
    <ReactMarkdown
      components={{ a: linkRenderer }}
      rehypePlugins={[rehypeRaw]}
      className={"markdown"}
    >
      {DOMpurify.sanitize(markDownText)}
    </ReactMarkdown>
  );
};

Markdown.propTypes = {
  /**
   * Size of the loading animation
   * */
  markDownText: propTypes.string,
};
