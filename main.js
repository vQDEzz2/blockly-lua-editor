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
  // 1. Create Part Block
  {
    "type": "create_part",
    "message0": "Create %1 Part named %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PART_TYPE",
        "options": [
          ["Block", "Part"],
          ["Sphere", "Sphere"],
          ["Wedge", "WedgePart"],
          ["Cylinder", "Cylinder"],
          ["Corner Wedge", "CornerWedgePart"]
        ]
      },
      {
        "type": "field_input",
        "name": "PART_NAME",
        "text": "myPart"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Creates a new part",
    "helpUrl": ""
  },
  // 2. Set Property Block
  {
    "type": "set_property",
    "message0": "Set %1 %2 to %3",
    "args0": [
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      },
      {
        "type": "field_dropdown",
        "name": "PROPERTY",
        "options": [
          ["Position", "Position"],
          ["Size", "Size"],
          ["Color", "Color"],
          ["Transparency", "Transparency"],
          ["Anchored", "Anchored"]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sets a property of an object",
    "helpUrl": ""
  },
  // 3. Set Material Block
  {
    "type": "set_material",
    "message0": "Set %1 material to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      },
      {
        "type": "field_dropdown",
        "name": "MATERIAL",
        "options": [
          ["Plastic", "Enum.Material.Plastic"],
          ["Wood", "Enum.Material.Wood"],
          ["Metal", "Enum.Material.Metal"],
          ["Grass", "Enum.Material.Grass"],
          ["Brick", "Enum.Material.Brick"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sets the material of a part",
    "helpUrl": ""
  },
  // 4. Move Part Block
  {
    "type": "move_part",
    "message0": "Move %1 by x: %2 y: %3 z: %4",
    "args0": [
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      },
      {
        "type": "input_value",
        "name": "X"
      },
      {
        "type": "input_value",
        "name": "Y"
      },
      {
        "type": "input_value",
        "name": "Z"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Moves a part by the specified amounts",
    "helpUrl": ""
  },
  // 5. Play Sound Block
  {
    "type": "play_sound",
    "message0": "Play sound %1 at %2",
    "args0": [
      {
        "type": "field_input",
        "name": "SOUND_ID",
        "text": "rbxassetid://123456789"
      },
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Plays a sound at the specified object",
    "helpUrl": ""
  },
  // 6. Set Parent Block
  {
    "type": "set_parent",
    "message0": "Set %1 parent to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "CHILD",
        "text": "myPart"
      },
      {
        "type": "field_input",
        "name": "PARENT",
        "text": "workspace"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Changes the parent of an object",
    "helpUrl": ""
  },
  // 7. Destroy Object Block
  {
    "type": "destroy_object",
    "message0": "Destroy %1",
    "args0": [
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "Destroys the specified object",
    "helpUrl": ""
  },
  // 8. On Touch Event Block
  {
    "type": "on_touch",
    "message0": "When %1 is touched do %2",
    "args0": [
      {
        "type": "field_input",
        "name": "OBJECT_NAME",
        "text": "myPart"
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "colour": 160,
    "tooltip": "Runs code when the object is touched",
    "helpUrl": ""
  },
  // 9. Wait Block
  {
    "type": "wait",
    "message0": "Wait %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "SECONDS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Pauses the script for a specified duration",
    "helpUrl": ""
  }
]);

// Define Lua code generators

// 1. Create Part Generator
Blockly.Lua['create_part'] = function(block) {
  var dropdown_part_type = block.getFieldValue('PART_TYPE');
  var text_part_name = block.getFieldValue('PART_NAME');
  var code = text_part_name + ' = Instance.new("' + dropdown_part_type + '")\n';
  code += text_part_name + '.Parent = workspace\n';
  return code;
};

// 2. Set Property Generator
Blockly.Lua['set_property'] = function(block) {
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var dropdown_property = block.getFieldValue('PROPERTY');
  var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);

  if (dropdown_property === 'Color') {
    // Ensure color value is in Color3.new format
    if (!value.startsWith('Color3.new')) {
      value = 'Color3.new(' + value + ')';
    }
  } else if (dropdown_property === 'Position' || dropdown_property === 'Size') {
    // Ensure vector value is in Vector3.new format
    if (!value.startsWith('Vector3.new')) {
      value = 'Vector3.new(' + value + ')';
    }
  }

  var code = text_object_name + '.' + dropdown_property + ' = ' + value + '\n';
  return code;
};

// 3. Set Material Generator
Blockly.Lua['set_material'] = function(block) {
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var dropdown_material = block.getFieldValue('MATERIAL');
  var code = text_object_name + '.Material = ' + dropdown_material + '\n';
  return code;
};

// 4. Move Part Generator
Blockly.Lua['move_part'] = function(block) {
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var value_x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_ATOMIC) || '0';
  var value_y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_ATOMIC) || '0';
  var value_z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_ATOMIC) || '0';
  var code = text_object_name + '.Position = ' + text_object_name + '.Position + Vector3.new(' + value_x + ', ' + value_y + ', ' + value_z + ')\n';
  return code;
};

// 5. Play Sound Generator
Blockly.Lua['play_sound'] = function(block) {
  var text_sound_id = block.getFieldValue('SOUND_ID');
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var soundVar = 'sound_' + Math.floor(Math.random() * 1000);
  var code = soundVar + ' = Instance.new("Sound")\n';
  code += soundVar + '.SoundId = "' + text_sound_id + '"\n';
  code += soundVar + '.Parent = ' + text_object_name + '\n';
  code += soundVar + ':Play()\n';
  return code;
};

// 6. Set Parent Generator
Blockly.Lua['set_parent'] = function(block) {
  var text_child = block.getFieldValue('CHILD');
  var text_parent = block.getFieldValue('PARENT');
  var code = text_child + '.Parent = ' + text_parent + '\n';
  return code;
};

// 7. Destroy Object Generator
Blockly.Lua['destroy_object'] = function(block) {
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var code = text_object_name + ':Destroy()\n';
  return code;
};

// 8. On Touch Event Generator
Blockly.Lua['on_touch'] = function(block) {
  var text_object_name = block.getFieldValue('OBJECT_NAME');
  var statements_do = Blockly.Lua.statementToCode(block, 'DO');
  var functionName = Blockly.Lua.provideFunction_(
    'onTouchEvent',
    ['function ' + Blockly.Lua.FUNCTION_NAME_PLACEHOLDER_ + '(hit)',
     statements_do + 'end']
  );
  var code = text_object_name + '.Touched:Connect(' + functionName + ')\n';
  return code;
};

// 9. Wait Generator
Blockly.Lua['wait'] = function(block) {
  var value_seconds = Blockly.Lua.valueToCode(block, 'SECONDS', Blockly.Lua.ORDER_ATOMIC) || '0';
  var code = 'wait(' + value_seconds + ')\n';
  return code;
};
