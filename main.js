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
  // 1. Input Block
  {
    "type": "lua_input",
    "message0": "Input prompt %1",
    "args0": [
      {
        "type": "input_value",
        "name": "PROMPT",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Prompts the user for input",
    "helpUrl": ""
  },
  // 2. Function with Return Block
  {
    "type": "lua_function_return",
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
        "text": "a, b"
      }
    ],
    "message1": "do %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "STACK"
      }
    ],
    "message2": "return %1",
    "args2": [
      {
        "type": "input_value",
        "name": "RETURN"
      }
    ],
    "colour": 290,
    "tooltip": "Defines a function with a return value",
    "helpUrl": ""
  },
  // 3. Create Table Block
  {
    "type": "lua_create_table",
    "message0": "Create table %1",
    "args0": [
      {
        "type": "field_input",
        "name": "TABLE_NAME",
        "text": "myTable"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Creates a new table",
    "helpUrl": ""
  },
  // 4. Table Insert Block
  {
    "type": "lua_table_insert",
    "message0": "Insert %1 into %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_input",
        "name": "TABLE_NAME",
        "text": "myTable"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Inserts a value into a table",
    "helpUrl": ""
  },
  // 5. Print Block
  {
    "type": "lua_print",
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
  // 6. Conditional Block
  {
    "type": "lua_if",
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
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If condition",
    "helpUrl": ""
  },
  // 7. Loop Block
  {
    "type": "lua_while",
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
  // 8. Assignment Block
  {
    "type": "lua_assignment",
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
  // 9. Math Operation Block
  {
    "type": "lua_math_operation",
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
          ["×", "*"],
          ["÷", "/"],
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
  // 10. Comparison Block
  {
    "type": "lua_comparison",
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
          ["=", "=="],
          ["≠", "~="],
          ["<", "<"],
          ["≤", "<="],
          [">", ">"],
          ["≥", ">="]
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
  }
]);

// Define Lua code generators

// 1. Input Generator
Blockly.Lua['lua_input'] = function(block) {
  var value_prompt = Blockly.Lua.valueToCode(block, 'PROMPT', Blockly.Lua.ORDER_ATOMIC) || '""';
  var code = 'io.write(' + value_prompt + ')\nlocal input = io.read()';
  return ['input', Blockly.Lua.ORDER_NONE];
};

// 2. Function with Return Generator
Blockly.Lua['lua_function_return'] = function(block) {
  var text_func_name = block.getFieldValue('FUNC_NAME');
  var text_params = block.getFieldValue('PARAMS');
  var statements_stack = Blockly.Lua.statementToCode(block, 'STACK');
  var value_return = Blockly.Lua.valueToCode(block, 'RETURN', Blockly.Lua.ORDER_NONE);
  var code = 'function ' + text_func_name + '(' + text_params + ')\n' + statements_stack;
  if (value_return) {
    code += '  return ' + value_return + '\n';
  }
  code += 'end\n';
  return code;
};

// 3. Create Table Generator
Blockly.Lua['lua_create_table'] = function(block) {
  var text_table_name = block.getFieldValue('TABLE_NAME');
  var code = text_table_name + ' = {}\n';
  return code;
};

// 4. Table Insert Generator
Blockly.Lua['lua_table_insert'] = function(block) {
  var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
  var text_table_name = block.getFieldValue('TABLE_NAME');
  var code = 'table.insert(' + text_table_name + ', ' + value_value + ')\n';
  return code;
};

// 5. Print Generator
Blockly.Lua['lua_print'] = function(block) {
  var value_text = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_NONE) || '""';
  var code = 'print(' + value_text + ')\n';
  return code;
};

// 6. Conditional Generator
Blockly.Lua['lua_if'] = function(block) {
  var value_condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var statements_do = Blockly.Lua.statementToCode(block, 'DO');
  var code = 'if ' + value_condition + ' then\n' + statements_do + 'end\n';
  return code;
};

// 7. Loop Generator
Blockly.Lua['lua_while'] = function(block) {
  var value_condition = Blockly.Lua.valueToCode(block, 'CONDITION', Blockly.Lua.ORDER_NONE) || 'false';
  var statements_do = Blockly.Lua.statementToCode(block, 'DO');
  var code = 'while ' + value_condition + ' do\n' + statements_do + 'end\n';
  return code;
};

// 8. Assignment Generator
Blockly.Lua['lua_assignment'] = function(block) {
  var text_var_name = block.getFieldValue('VAR_NAME');
  var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_NONE) || '0';
  var code = text_var_name + ' = ' + value_value + '\n';
  return code;
};

// 9. Math Operation Generator
Blockly.Lua['lua_math_operation'] = function(block) {
  var value_a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_NONE) || '0';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_NONE) || '0';
  var code = '(' + value_a + ' ' + dropdown_op + ' ' + value_b + ')';
  return [code, Blockly.Lua.ORDER_NONE];
};

// 10. Comparison Generator
Blockly.Lua['lua_comparison'] = function(block) {
  var value_a = Blockly.Lua.valueToCode(block, 'A', Blockly.Lua.ORDER_RELATIONAL) || '0';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_RELATIONAL) || '0';
  var code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.Lua.ORDER_RELATIONAL];
};
