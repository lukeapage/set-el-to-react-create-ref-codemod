import { get } from 'lodash';
import isReactClass from '../util/isReactClass';

const getConstructorContents = (j, path, cb) =>
  j(path).find(j.MethodDefinition, {
    kind: 'constructor'
  }).forEach((path) => {
      cb(j(path).find(j.ExpressionStatement));
  });

const checkArrowWithSingleAssignment = (arrowNode) =>
  arrowNode.body.body.length === 1 &&
  arrowNode.body.body[0].type === 'ExpressionStatement' &&
  arrowNode.body.body[0].expression.type === 'AssignmentExpression' &&
  arrowNode.body.body[0].expression.left.type === 'MemberExpression' &&
  arrowNode.body.body[0].expression.left.object.type === 'ThisExpression' &&
  arrowNode.body.body[0].expression.left.property.type === 'Identifier' &&
  arrowNode.body.body[0].expression.right.type === 'Identifier'
   ? {
    isValid: true,
    elementName: arrowNode.body.body[0].expression.left.property.name,
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
    const constructorNodes = getConstructorContents(j, path, (constructorStatementPaths) => {
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
          debugger;
          const {
            isValid,
            elementName,
          } = checkArrowWithSingleAssignment(arrowNode);
    
          if (!isValid) {
            throw new Error('unexpected setEl');
          }

          const newElementName = elementName + 'Ref';
    
          j(setElPath).replaceWith(j.expressionStatement(j.assignmentExpression(
            '=',            
            j.memberExpression(
              j.thisExpression(),
              j.identifier(newElementName),
            ),
            j.callExpression(j.memberExpression(
              j.identifier('React'),
              j.identifier('createRef')
            ), []))));

          j(path)
            .find(j.Identifier, { name: 'setEl' })
            .filter((setElIdentifier) =>
              setElIdentifier.parent.node.type === 'MemberExpression' &&
              setElIdentifier.parent.node.object.type === 'ThisExpression'
            )
            .forEach((setElIdentifier) => {
              j(setElIdentifier).replaceWith(j.identifier(newElementName))
            });

            j(path)
              .find(j.Identifier, { name: elementName })
              .filter((elIdentifier) =>
                elIdentifier.parent.node.type === 'MemberExpression' &&
                elIdentifier.parent.node.object.type === 'ThisExpression'
            )
            .forEach((elIdentifier) => {
              j(elIdentifier).replaceWith(j.memberExpression(j.identifier(newElementName),j.identifier('current')))
            });            
        })
    });
  });
};
