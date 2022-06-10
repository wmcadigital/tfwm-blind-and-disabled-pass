import React from 'react';
import PropTypes from 'prop-types';

import { GlobalContextProvider } from './globalState';
import { FormDataContextProvider } from './formDataState';

type TProviderComposerProps = {
  contexts: JSX.Element[];
  children: React.ReactNode;
};

const ProviderComposer = ({ contexts, children }: TProviderComposerProps) => {
  return (
    <>
      {contexts.reduceRight(
        (kids: React.ReactNode, parent: JSX.Element) =>
          React.cloneElement(parent, {
            children: kids,
          }),
        children,
      )}
    </>
  );
};

ProviderComposer.propTypes = {
  contexts: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  children: PropTypes.node.isRequired,
};

// Main context provider component so that the app can be wrapped in all state contexts
const ContextProvider = ({ children = {} }) => {
  // Add all providers with a self-closing tag to the contexts array below
  const contexts = [<GlobalContextProvider />, <FormDataContextProvider />];

  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

export default ContextProvider;
