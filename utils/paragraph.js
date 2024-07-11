// Paragraph.js
import React from 'react';
import Image from 'next/image';

const Paragraph = ({ node, ...props }) => {
  if (node.children[0]?.tagName === 'img') {
    const image = node.children[0];
    const metastring = image.properties.alt || '';
    const alt = metastring.replace(/ *\{[^)]*\} */g, '');
    const metaWidth = metastring.match(/{([^}]+)x/);
    const metaHeight = metastring.match(/x([^}]+)}/);
    const width = metaWidth ? metaWidth[1] : '768';
    const height = metaHeight ? metaHeight[1] : '432';
    const isPriority = metastring.toLowerCase().includes('{priority}');
    const hasCaption = metastring.toLowerCase().includes('{caption:');
    const caption = metastring.match(/{caption: (.*?)}/)?.[1];

    let src = image.properties.src;
    if (!src.startsWith('http') && !src.startsWith('/')) {
      src = `/${src}`;
    }

    return (
      <div className="postImgWrapper">
        <Image
          src={src}
          width={parseInt(width, 10)}
          height={parseInt(height, 10)}
          className="postImg"
          alt={alt}
          priority={isPriority}
        />
        {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
      </div>
    );
  }

  return <p {...props}>{props.children}</p>;
};

export default Paragraph;
