import React from 'react';

/**
 * Wraps the given text in an <a> with href equal to the given URL, if the
 * given URL is truthy. Otherwise, just returns the URL.
 */
export const linkWrapper = (text, url) => {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }
  return text;
};
