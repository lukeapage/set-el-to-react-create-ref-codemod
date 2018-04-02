import { get } from 'lodash';
import isReactClass from '../util/isReactClass';

const getConstructorContents = (j, path, cb) =>
  j(path).find(j.MethodDefinition, {
    kind: 'constructor'
  }).forEach((path) => {
      cb(j(path).find(j.ExpressionStatement));
  });

const checkArrowWithSingleAssignment = (arrowNode) =>
  arrowNode.type !== 'X' ? {
    isValid: true,
    elementName: arrowNode.name,
  } : {
    isValid: false
  };

export default (j, ast, options) => {
  const classComponents = ast
    .find(j.ClassDeclaration)
    .filter(({ node }) => (
      node.superClass &&
      isReactClass(node.superClass)
    ));

  if (!classComponents.length) {
    return;
  }

  classComponents.forEach((path) => {
    const { node } = path;
    debugger;
    const constructorNodes = getConstructorContents(j, path, (constructorStatementPaths) => {
      console.log('got paths', constructorStatementPaths.length);
      constructorStatementPaths
        .filter((p) =>
          p.node.expression.type === 'AssignmentExpression' &&
          p.node.expression.left.type === 'MemberExpression' &&
          p.node.expression.left.object.type === 'ThisExpression' &&
          p.node.expression.left.property.type === 'Identifier' &&
          p.node.expression.left.property.name === 'setEl' &&
          p.node.expression.right.type === 'ArrowFunctionExpression')
        .forEach((setElPath) => {
          const refFnName = setElPath.node.expression.left.property.name;
          const arrowNode = setElPath.node.expression.right;
          const {
            isValid,
            elementName,
          } = checkArrowWithSingleAssignment(arrowNode);
    
          if (!isValid) {
            throw new Error('unexpected setEl');
          }
    
          j(setElPath).replaceWith(j.expressionStatement(j.assignmentExpression(
            '=',            
            j.memberExpression(
              j.thisExpression(),
              j.identifier('test'),
            ),
            j.callExpression(j.memberExpression(
              j.identifier('React'),
              j.identifier('createRef')
            ), []))));    
        })
    });
  });
};
