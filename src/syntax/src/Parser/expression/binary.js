import {
  Token,
  Types as Type,
  TokenList as TT
} from "../../labels";

import Node from "../../nodes";

import {
  PEX_PRECEDENCE as Prefix,
  IFX_PRECEDENCE as Infix,
  POX_PRECEDENCE as Postfix
} from "../../precedence";

import {
  getNameByLabel,
  getLabelByNumber
} from "../../utils";

/**
 * @param {Number} index
 * @return {Node}
 */
export function parseBinaryExpression(index) {

  let tmp = null;
  let left = null;
  let node = null;

  let state = Infix[index];

  left = state !== void 0 ? this.parseBinaryExpression(index + 1) : this.parseExpression();

  while (this.acceptPrecedence(state)) {
    node = this.createNode(Type.BinaryExpression);
    node.operator = TT[state.op];
    this.next();
    node.left = left;
    tmp = state !== void 0 ? this.parseBinaryExpression(index + 1) : this.parseExpression();
    node.right = tmp;
    left = node;
  };

  // No infix expression, so check if postfix
  if (state === void 0 && this.current !== void 0) {
    if (this.isPostfixOperator(this.current)) {
      return (this.parseUnaryExpression(left));
    }
  }

  return (left);

}

/**
 * @return {Node}
 */
export function parseExpression() {

  let node = null;
  let isParenthised = this.peek(TT.LPAREN);

  // Standalone parenthised operator
  if (this.isOperator(this.current.name)) {
    this.next();
    if (this.peek(TT.RPAREN)) {
      this.back();
      node = this.parseSpecialLiteral();
      return (node);
    }
    else {
      this.back();
    }
  }

  node = this.parseAtom(this.parseLiteral());

  if (node !== null && node.kind === Type.BinaryExpression) {
    node.isParenthised = isParenthised;
  }

  return (node);

}

/**
 * @param {Object} token
 * @return {Boolean}
 */
export function isPrefixOperator(token) {

  let op = this.getUnifiedOperator(token);

  return (this.opInArray(Prefix, op));

}

/**
 * @param {Object} token
 * @return {Boolean}
 */
export function isPostfixOperator(token) {

  let op = this.getUnifiedOperator(token);

  return (this.opInArray(Postfix, op));

}

/**
 * Parses an operator token, which is either
 * tokenized as a identifier (unknown) or a TT index
 * @return {String}
 */
export function getUnifiedOperator(token) {

  if (token.name === Token.Identifier) {
    return (token.value);
  } else {
    // Turn into op value
    return (
      getLabelByNumber(
        TT[getNameByLabel(token.name)]
      )
    );
  }

}

/**
 * @return {Boolean}
 */
export function opInArray(array, op) {
  for (let key of array) {
    if (key.op === op) return (true);
  };
  return (false);
}