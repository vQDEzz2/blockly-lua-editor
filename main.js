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
  // Game Init Block
  {
    "type": "game_init",
    "message0": "When game starts %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "INIT_CODE"
      }
    ],
    "colour": 120,
    "tooltip": "Code to run when the game starts",
    "helpUrl": ""
  },
  // Game Draw Block
  {
    "type": "game_draw",
    "message0": "Every frame draw %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "DRAW_CODE"
      }
    ],
    "colour": 160,
    "tooltip": "Code to run every frame to draw on the screen",
    "helpUrl": ""
  },
  // Game Update Block
  {
    "type": "game_update",
    "message0": "Every frame update %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "UPDATE_CODE"
      }
    ],
    "colour": 200,
    "tooltip": "Code to run every frame to update game state",
    "helpUrl": ""
  },
  // Key Pressed Block
  {
    "type": "key_pressed",
    "message0": "When key %1 is pressed %2",
    "args0": [
      {
        "type": "field_input",
        "name": "KEY",
        "text": "space"
      },
      {
        "type": "input_statement",
        "name": "KEY_CODE"
      }
    ],
    "colour": 260,
    "tooltip": "Code to run when a specific key is pressed",
    "helpUrl": ""
  },
  // Load Image Block
  {
    "type": "load_image",
    "message0": "Load image %1 from file %2",
    "args0": [
      {
        "type": "field_input",
        "name": "IMAGE_VAR",
        "text": "myImage"
      },
      {
        "type": "field_input",
        "name": "FILE_PATH",
        "text": "image.png"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Loads an image from a file",
    "helpUrl": ""
  },
  // Draw Image Block
  {
    "type": "draw_image",
    "message0": "Draw image %1 at x: %2 y: %3",
    "args0": [
      {
        "type": "field_input",
        "name": "IMAGE_VAR",
        "text": "myImage"
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
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Draws an image at the specified coordinates",
    "helpUrl": ""
  },
  // Load Sound Block
  {
    "type": "load_sound",
    "message0": "Load sound %1 from file %2",
    "args0": [
      {
        "type": "field_input",
        "name": "SOUND_VAR",
        "text": "mySound"
      },
      {
        "type": "field_input",
        "name": "FILE_PATH",
        "text": "sound.wav"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Loads a sound from a file",
    "helpUrl": ""
  },
  // Play Sound Block
  {
    "type": "play_sound",
    "message0": "Play sound %1",
    "args0": [
      {
        "type": "field_input",
        "name": "SOUND_VAR",
        "text": "mySound"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "Plays a sound",
    "helpUrl": ""
  },
]);

// Define Lua code generators

// Game Init Generator
Blockly.Lua['game_init'] = function(block) {
  var statements_init_code = Blockly.Lua.statementToCode(block, 'INIT_CODE');
  var code = '-- Initialization\nfunction love.load()\n' + statements_init_code + 'end\n';
  return code;
};

// Game Draw Generator
Blockly.Lua['game_draw'] = function(block) {
  var statements_draw_code = Blockly.Lua.statementToCode(block, 'DRAW_CODE');
  var code = '-- Drawing\nfunction love.draw()\n' + statements_draw_code + 'end\n';
  return code;
};

// Game Update Generator
Blockly.Lua['game_update'] = function(block) {
  var statements_update_code = Blockly.Lua.statementToCode(block, 'UPDATE_CODE');
  var code = '-- Updating\nfunction love.update(dt)\n' + statements_update_code + 'end\n';
  return code;
};

// Key Pressed Generator
Blockly.Lua['key_pressed'] = function(block) {
  var key = block.getFieldValue('KEY');
  var statements_key_code = Blockly.Lua.statementToCode(block, 'KEY_CODE');
  var code = 'if key == "' + key + '" then\n' + statements_key_code + 'end\n';
  Blockly.Lua.definitions_['love_keypressed'] = `
-- Keyboard Input
function love.keypressed(key)
` + (Blockly.Lua.definitions_['love_keypressed_body'] || '') + `
end
`;
  Blockly.Lua.definitions_['love_keypressed_body'] = (Blockly.Lua.definitions_['love_keypressed_body'] || '') + code;
  return '';
};

// Load Image Generator
Blockly.Lua['load_image'] = function(block) {
  var imageVar = block.getFieldValue('IMAGE_VAR');
  var filePath = block.getFieldValue('FILE_PATH');
  var code = imageVar + ' = love.graphics.newImage("' + filePath + '")\n';
  return code;
};

// Draw Image Generator
Blockly.Lua['draw_image'] = function(block) {
  var imageVar = block.getFieldValue('IMAGE_VAR');
  var x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_NONE) || '0';
  var y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_NONE) || '0';
  var code = 'love.graphics.draw(' + imageVar + ', ' + x + ', ' + y + ')\n';
  return code;
};

// Load Sound Generator
Blockly.Lua['load_sound'] = function(block) {
  var soundVar = block.getFieldValue('SOUND_VAR');
  var filePath = block.getFieldValue('FILE_PATH');
  var code = soundVar + ' = love.audio.newSource("' + filePath + '", "static")\n';
  return code;
};

// Play Sound Generator
Blockly.Lua['play_sound'] = function(block) {
  var soundVar = block.getFieldValue('SOUND_VAR');
  var code = soundVar + ':play()\n';
  return code;
};
