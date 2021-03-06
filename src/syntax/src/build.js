import {
  Token,
  Types as Type,
  TokenList as TT
} from "./labels";

import {
  registerOperator
} from "./precedence";

let PREFIX = TT.PREFIX;
let INFIX = TT.INFIX;
let POSTFIX = TT.POSTFIX;

/** PREFIX */
registerOperator("!", -1, "none", "NOT", PREFIX);
registerOperator("+", -1, "none", "UNARY_ADD", PREFIX);
registerOperator("-", -1, "none", "UNARY_SUB", PREFIX);

/** INFIX */
registerOperator("*", 150, "left", "MUL", INFIX);
registerOperator("/", 150, "left", "DIV", INFIX);
registerOperator("%", 150, "left", "MOD", INFIX);

registerOperator("+", 140, "left", "ADD", INFIX);
registerOperator("-", 140, "left", "SUB", INFIX);

registerOperator("<", 130, "none", "LT", INFIX);
registerOperator("<=", 130, "none", "LE", INFIX);
registerOperator(">", 130, "none", "GT", INFIX);
registerOperator(">=", 130, "none", "GE", INFIX);

registerOperator("==", 130, "none", "EQ", INFIX);
registerOperator("!=", 130, "none", "NEQ", INFIX);

registerOperator("&&", 120, "left", "AND", INFIX);
registerOperator("||", 110, "left", "OR", INFIX);

registerOperator("=", 90, "right", "ASSIGN", INFIX);

registerOperator("*=", 90, "right", "CMP_MUL", INFIX);
registerOperator("/=", 90, "right", "CMP_DIV", INFIX);
registerOperator("%=", 90, "right", "CMP_MOD", INFIX);
registerOperator("+=", 90, "right", "CMP_ADD", INFIX);
registerOperator("-=", 90, "right", "CMP_SUB", INFIX);

/** POSTFIX */
registerOperator("--", -1, "none", "POST_SUB", POSTFIX);
registerOperator("++", -1, "none", "POST_ADD", POSTFIX);