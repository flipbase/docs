import React, { type JSX } from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type { WrapperProps } from '@docusaurus/types';
import CredentialsCard from '@site/src/components/CredentialsCard';

type Props = WrapperProps<typeof ContentType>;

/**
 * A wrapper rather than a copy of the theme component.
 *
 * Swizzling the whole sidebar would fork several hundred lines of Docusaurus
 * internals into this repo and quietly stop receiving upstream fixes. Wrapping
 * renders the original untouched and appends to it, so a Docusaurus upgrade
 * changes the sidebar and leaves this alone.
 */
export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <Content {...props} />
      <CredentialsCard />
    </>
  );
}
