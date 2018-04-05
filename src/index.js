import 'babel-polyfill';

import handleClassPropTypes from './tranformers/convertSetEl';

export const parser = 'flow';

const transformer = (fileInfo, { jscodeshift }, options) => {
  const ast = jscodeshift(fileInfo.source);

  handleClassPropTypes(jscodeshift, ast, options);

  return ast.toSource({
    lineTerminator: '\n',
    quote: 'single',
    trailingComma: true,
  });
};

export default transformer;
