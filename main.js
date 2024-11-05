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
          ["Part", "Part"],
          ["Sphere", "Sphere"],
          ["Wedge", "WedgePart"],
          ["Cylinder", "CylinderMesh"],
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
    "tooltip": "Creates a new part and adds it to the workspace",
    "helpUrl": ""
  },
  // 2. Set Property Block
  {
    "type": "set_property",
    "message0": "Set %1's %2 to %3",
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
          ["Anchored", "Anchored"],
          ["CanCollide", "CanCollide"]
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
  // 3. Move Part Block
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
        "name": "X",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Y",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Z",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Moves a part by the specified amounts",
    "helpUrl": ""
  },
  // 4. On Touch Event Block
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
  // 5. Wait Block
  {
    "type": "wait",
    "message0": "Wait %1 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "SECONDS",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Pauses the script for a specified duration",
    "helpUrl": ""
  },
  // 6. Print Block
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
    "tooltip": "Prints text to the output",
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
  // 8. Spawn Part Block
  {
    "type": "spawn_part",
    "message0": "Spawn %1 at position x: %2 y: %3 z: %4",
    "args0": [
      {
        "type": "field_input",
        "name": "PART_NAME",
        "text": "myPart"
      },
      {
        "type": "input_value",
        "name": "X",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Y",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Z",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Creates a part at the specified position",
    "helpUrl": ""
  },
  // 9. Change Parent Block
  {
    "type": "change_parent",
    "message0": "Set %1's parent to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "CHILD_NAME",
        "text": "myPart"
      },
      {
        "type": "field_input",
        "name": "PARENT_NAME",
        "text": "workspace"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Changes the parent of an object",
    "helpUrl": ""
  },
  // 10. Play Sound Block
  {
    "type": "play_sound",
    "message0": "Play sound %1 on %2",
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
    "tooltip": "Plays a sound on the specified object",
    "helpUrl": ""
  },
  // 11. Set Material Block
  {
    "type": "set_material",
    "message0": "Set %1's material to %2",
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
  }
]);

// Define Lua code generators

// 1. Create Part Generator
Blockly.Lua['create_part'] = function(block) {
  var partType = block.getFieldValue('PART_TYPE');
  var partName = block.getFieldValue('PART_NAME');
  var code = partName + ' = Instance.new("' + partType + '")\n' +
             partName + '.Parent = workspace\n';
  return code;
};

// 2. Set Property Generator
Blockly.Lua['set_property'] = function(block) {
  var objectName = block.getFieldValue('OBJECT_NAME');
  var property = block.getFieldValue('PROPERTY');
  var value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_NONE);

  // Special handling for certain properties
  if (property === 'Color') {
    if (!value.startsWith('Color3.new')) {
      value = 'Color3.new(' + value + ')';
    }
  } else if (property === 'Position' || property === 'Size') {
    if (!value.startsWith('Vector3.new')) {
      value = 'Vector3.new(' + value + ')';
    }
  }

  var code = objectName + '.' + property + ' = ' + value + '\n';
  return code;
};

// 3. Move Part Generator
Blockly.Lua['move_part'] = function(block) {
  var objectName = block.getFieldValue('OBJECT_NAME');
  var x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_NONE) || '0';
  var y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_NONE) || '0';
  var z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_NONE) || '0';
  var code = objectName + '.Position = ' + objectName + '.Position + Vector3.new(' + x + ', ' + y + ', ' + z + ')\n';
  return code;
};

// 4. On Touch Event Generator
Blockly.Lua['on_touch'] = function(block) {
  var objectName = block.getFieldValue('OBJECT_NAME');
  var statements = Blockly.Lua.statementToCode(block, 'DO');
  var functionName = Blockly.Lua.nameDB_.getDistinctName(
    objectName + '_Touched', Blockly.Procedures.NAME_TYPE);
  var code = 'local function ' + functionName + '(hit)\n' +
             statements + 'end\n' +
             objectName + '.Touched:Connect(' + functionName + ')\n';
  return code;
};

// 5. Wait Generator
Blockly.Lua['wait'] = function(block) {
  var seconds = Blockly.Lua.valueToCode(block, 'SECONDS', Blockly.Lua.ORDER_NONE) || '0';
  var code = 'wait(' + seconds + ')\n';
  return code;
};

// 6. Print Generator
Blockly.Lua['print'] = function(block) {
  var text = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_NONE) || '""';
  var code = 'print(' + text + ')\n';
  return code;
};

// 7. Destroy Object Generator
Blockly.Lua['destroy_object'] = function(block) {
  var objectName = block.getFieldValue('OBJECT_NAME');
  var code = objectName + ':Destroy()\n';
  return code;
};

// 8. Spawn Part Generator
Blockly.Lua['spawn_part'] = function(block) {
  var partName = block.getFieldValue('PART_NAME');
  var x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_NONE) || '0';
  var y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_NONE) || '0';
  var z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_NONE) || '0';
  var code = partName + ' = Instance.new("Part")\n' +
             partName + '.Parent = workspace\n' +
             partName + '.Position = Vector3.new(' + x + ', ' + y + ', ' + z + ')\n';
  return code;
};

// 9. Change Parent Generator
Blockly.Lua['change_parent'] = function(block) {
  var childName = block.getFieldValue('CHILD_NAME');
  var parentName = block.getFieldValue('PARENT_NAME');
  var code = childName + '.Parent = ' + parentName + '\n';
  return code;
};

// 10. Play Sound Generator
Blockly.Lua['play_sound'] = function(block) {
  var soundId = block.getFieldValue('SOUND_ID');
  var objectName = block.getFieldValue('OBJECT_NAME');
  var soundVar = Blockly.Lua.nameDB_.getDistinctName(
    'sound', Blockly.Variables.NAME_TYPE);
  var code = soundVar + ' = Instance.new("Sound")\n' +
             soundVar + '.SoundId = "' + soundId + '"\n' +
             soundVar + '.Parent = ' + objectName + '\n' +
             soundVar + ':Play()\n';
  return code;
};

// 11. Set Material Generator
Blockly.Lua['set_material'] = function(block) {
  var objectName = block.getFieldValue('OBJECT_NAME');
  var material = block.getFieldValue('MATERIAL');
  var code = objectName + '.Material = ' + material + '\n';
  return code;
};
