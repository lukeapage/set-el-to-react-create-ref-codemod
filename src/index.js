import 'babel-polyfill';

import { flow, map, reduce, findIndex, findLastIndex, find } from 'lodash/fp';
import handleClassPropTypes from './tranformers/handleClassPropTypes';

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
