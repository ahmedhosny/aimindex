import * as React from 'react';
import cn from 'classnames';
import './ContentBox.css';

export function ContentBox({className, children, style}) {
  return <div className={'ContentBox'}>{children}</div>;
}

export function ContentBoxHeader({text, sourceLink, docsLink}) {
  const links = [];

  if (sourceLink) {
    links.push(
      <a className={'Link'} href={sourceLink} key="sourceLink">
        Source
      </a>
    );
  }

  if (sourceLink && docsLink) {
    links.push(<span key="separator"> | </span>);
  }

  if (docsLink) {
    links.push(
      <a className={'Link'} href={docsLink} key="docsLink">
        Docs
      </a>
    );
  }

  return (
    <h1 className={'Header'}>
      {text}

      {links.length > 0 && <small className={'Small'}>{links}</small>}
    </h1>
  );
}

export function ContentBoxParagraph({children}) {
  return <div className={'Paragraph'}>{children}</div>;
}
