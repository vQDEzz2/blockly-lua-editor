// Initialize Blockly workspace
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
});

// Update code preview
function updateCode(event) {
  var code = Blockly.Lua.workspaceToCode(workspace);
  document.getElementById('code').textContent = code;
}

// Add change listener
workspace.addChangeListener(updateCode);

// Define custom blocks
Blockly.defineBlocksWithJsonArray([
  // 1. Variable Declaration Block
  {
    "type": "variable_declare",
    "message0": "Declare %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VAR_TYPE",
        "options": [
          ["local", "local"],
          ["global", ""]
        ]
      },
      {
        "type": "field_input",
        "name": "VAR_NAME",
        "text": "variable"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "Declares a variable",
    "helpUrl": ""
  },
  // 2. Variable Assignment Block
  {
    "type": "variable_set",
    "message0": "Set %1 to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "VAR_NAME",
        "text": "variable"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330,
    "tooltip": "Assigns a value to a variable",
    "helpUrl": ""
  },
  // 3. Function Definition Block
  {
    "type": "function_definition",
    "message0": "Define function %1 with parameters %2",
    "args0": [
      {
        "type": "field_input",
        "name": "FUNC_NAME",
        "text": "myFunction"
      },
      {
        "type": "field_input",
        "name": "PARAMS",
        "text": ""
      }
    ],
    "message1": "do %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "BODY"
      }
    ],
    "colour": 290,
    "tooltip": "Defines a function",
    "helpUrl": ""
  },
  // 4. Function Call Block
  {
    "type": "function_call",
    "message0": "Call function %1 with arguments %2",
    "args0": [
      {
        "type": "field_input",
        "name": "FUNC_NAME",
        "text": "myFunction"
      },
      {
        "type": "field_input",
        "name": "ARGS",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Calls a function",
    "helpUrl": ""
  },
  // 5. Print Block
  {
    "type": "print",
    "message0": "Print %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Prints text to the console",
    "helpUrl": ""
  },
  // 6. If Statement Block
  {
    "type": "if_statement",
    "message0": "If %1 then",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "THEN"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If statement",
    "helpUrl": ""
  },
  // 7. If-Else Statement Block
  {
    "type": "if_else_statement",
    "message0": "If %1 then",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "THEN"
      }
    ],
    "message2": "Else %1",
    "args2": [
      {
        "type": "input_statement",
        "name": "ELSE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If-Else statement",
    "helpUrl": ""
  },
  // 8. While Loop Block
  {
    "type": "while_loop",
    "message0": "While %1 do",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "While loop",
    "helpUrl": ""
  },
  // 9. Repeat Until Loop Block
  {
    "type": "repeat_until_loop",
    "message0": "Repeat %1 until %2",
    "args0": [
      {
        "type": "input_statement",
        "name": "DO"
      },
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Repeat until loop",
    "helpUrl": ""
  },
  // 10. For Loop Block
  {
    "type": "for_loop",
    "message0": "For %1 = %2 to %3 do",
    "args0": [
      {
        "type": "field_input",
        "name": "VAR_NAME",
        "text": "i"
      },
      {
        "type": "input_value",
        "name": "START",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "END",
        "check": "Number"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "For loop",
    "helpUrl": ""
  },
  // 11. Math Operation Block
  {
    "type": "math_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["+", "+"],
          ["-", "-"],
          ["*", "*"],
          ["/", "/"],
          ["^", "^"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Performs a math operation",
    "helpUrl": ""
  },
  // 12. Comparison Block
  {
    "type": "comparison",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["==", "=="],
          ["~=", "~="],
          ["<", "<"],
          ["<=", "<="],
          [">", ">"],
          [">=", ">="]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Performs a comparison",
    "helpUrl": ""
  },
  // 13. Logical Operation Block
  {
    "type": "logical_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["and", "and"],
          ["or", "or"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Boolean"
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Performs a logical operation",
    "helpUrl": ""
  },
  // 14. Not Operation Block
  {
    "type": "not_operation",
    "message0": "not %1",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean"
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Logical NOT operation",
    "helpUrl": ""
  },
  // 15. Return Statement Block
  {
    "type": "return_statement",
    "message0": "Return %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "colour": 290,
    "tooltip": "Returns a value from a function",
    "helpUrl": ""
  }
]);

// Define Lua code generators

// 1. Variable Declaration Generator
Blockly.Lua['variable_declare'] = function(block) {
  var varType = block.getFieldValue('VAR_TYPE');
  var varName = block.getFieldValue('VAR_NAME');
  var code = varType + ' ' + varName + '\n';
  return code;
};

// 2. Variable Assignment Generator
Blockly.Lua['variable_set'] = function(block) {
  var varName = block.getFieldValue('VAR_NAME');
  var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_NONE) || 'nil';
  var code = varName + ' = ' + value + '\n';
  return code;
};

// 3. Function Definition Generator
Blockly.Lua['function_definition'] = function(block) {
  var funcName = block.getFieldValue('FUNC_NAME');
  var params = block.getFieldValue('PARAMS');
  var body = Blockly.Lua.statementToCode(block, 'BODY');
  var code = 'function ' + funcName + '(' + params + ')\n' + body + 'end\n';
  return code;
};

// 4. Function Call Generator
Blockly.Lua['function_call'] = function(block) {
  var funcName = block.getFieldValue('FUNC_NAME');
  var args = block.getFieldValue('ARGS');
  var code = funcName + '(' + args + ')\n';
  return code;
};

// 5. Print Generator
Blockly.Lua['print'] = function(block) {
  var text = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_NONE) || '""';
  var code = 'print(' + text + ')\n';
  return code;
};

// 6. If Statement Generator
Blockly.Lua['if_statement'] = function(block) {
  var condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var statements = Blockly.Lua.statementToCode(block, 'THEN');
  var code = 'if ' + condition + ' then\n' + statements + 'end\n';
  return code;
};

// 7. If-Else Statement Generator
Blockly.Lua['if_else_statement'] = function(block) {
  var condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var thenStatements = Blockly.Lua.statementToCode(block, 'THEN');
  var elseStatements = Blockly.Lua.statementToCode(block, 'ELSE');
  var code = 'if ' + condition + ' then\n' + thenStatements + 'else\n' + elseStatements + 'end\n';
  return code;
};

// 8. While Loop Generator
Blockly.Lua['while_loop'] = function(block) {
  var condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var statements = Blockly.Lua.statementToCode(block, 'DO');
  var code = 'while ' + condition + ' do\n' + statements + 'end\n';
  return code;
};

// 9. Repeat Until Loop Generator
Blockly.Lua['repeat_until_loop'] = function(block) {
  var statements = Blockly.Lua.statementToCode(block, 'DO');
  var condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var code = 'repeat\n' + statements + 'until ' + condition + '\n';
  return code;
};

// 10. For Loop Generator
Blockly.Lua['for_loop'] = function(block) {
  var varName = block.getFieldValue('VAR_NAME');
  var start = Blockly.Lua.valueToCode(block, 'START', Blockly.Lua.ORDER_NONE) || '0';
  var end = Blockly.Lua.valueToCode(block, 'END', Blockly.Lua.ORDER_NONE) || '0';
  var statements = Blockly.Lua.statementToCode(block, 'DO');
  var code = 'for ' + varName + ' = ' + start + ', ' + end + ' do\n' + statements + 'end\n';
  return code;
};

// 11. Math Operation Generator
Blockly.Lua['math_operation'] = function(block) {
  var a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_NONE) || '0';
  var op = block.getFieldValue('OP');
  var b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_NONE) || '0';
  var code = '(' + a + ' ' + op + ' ' + b + ')';
  return [code, Blockly.Lua.ORDER_NONE];
};

// 12. Comparison Generator
Blockly.Lua['comparison'] = function(block) {
  var a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_RELATIONAL) || '0';
  var op = block.getFieldValue('OP');
  var b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_RELATIONAL) || '0';
  var code = a + ' ' + op + ' ' + b;
  return [code, Blockly.Lua.ORDER_RELATIONAL];
};

// 13. Logical Operation Generator
Blockly.Lua['logical_operation'] = function(block) {
  var a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_LOGICAL) || 'false';
  var op = block.getFieldValue('OP');
  var b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_LOGICAL) || 'false';
  var code = a + ' ' + op + ' ' + b;
  return [code, Blockly.Lua.ORDER_LOGICAL];
};

// 14. Not Operation Generator
Blockly.Lua['not_operation'] = function(block) {
  var a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_LOGICAL_NOT) || 'false';
  var code = 'not ' + a;
  return [code, Blockly.Lua.ORDER_LOGICAL_NOT];
};

// 15. Return Statement Generator
Blockly.Lua['return_statement'] = function(block) {
  var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_NONE) || '';
  var code = 'return ' + value + '\n';
  return code;
};
