'use strict';

// Basic Blocks
Blockly.Blocks['roblox_print'] = {
    init: function() {
        this.appendValueInput('TEXT')
            .setCheck(null)
            .appendField('print');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4444');
        this.setTooltip('Prints text to the output');
    }
};

Blockly.Blocks['roblox_wait'] = {
    init: function() {
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField('wait');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4444');
        this.setTooltip('Waits for the specified number of seconds');
    }
};

Blockly.Blocks['roblox_comment'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('comment')
            .appendField(new Blockly.FieldTextInput('Add comment here...'), 'COMMENT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4444');
        this.setTooltip('Adds a comment to your code');
    }
};

// Instance Creation Blocks
Blockly.Blocks['roblox_part_create'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('create new')
            .appendField(new Blockly.FieldDropdown([
                ['Part', 'Part'],
                ['Model', 'Model'],
                ['Folder', 'Folder'],
                ['Script', 'Script'],
                ['LocalScript', 'LocalScript'],
                ['Sound', 'Sound']
            ]), 'TYPE');
        this.appendValueInput('NAME')
            .setCheck('String')
            .appendField('named');
        this.appendDummyInput()
            .appendField('in')
            .appendField(new Blockly.FieldDropdown([
                ['Workspace', 'workspace'],
                ['StarterGui', 'StarterGui'],
                ['ReplicatedStorage', 'ReplicatedStorage'],
                ['ServerStorage', 'ServerStorage']
            ]), 'PARENT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4444');
        this.setTooltip('Creates a new Roblox instance');
    }
};

// Part Manipulation Blocks
Blockly.Blocks['roblox_part_properties'] = {
    init: function() {
        this.appendValueInput('INSTANCE')
            .setCheck(null)
            .appendField('set properties of');
        this.appendDummyInput()
            .appendField('Size')
            .appendField(new Blockly.FieldNumber(1), 'SIZE_X')
            .appendField('×')
            .appendField(new Blockly.FieldNumber(1), 'SIZE_Y')
            .appendField('×')
            .appendField(new Blockly.FieldNumber(1), 'SIZE_Z');
        this.appendDummyInput()
            .appendField('Color')
            .appendField(new Blockly.FieldColour('#ff0000'), 'COLOR');
        this.appendDummyInput()
            .appendField('Transparency')
            .appendField(new Blockly.FieldNumber(0, 0, 1, 0.1), 'TRANSPARENCY');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4444');
        this.setTooltip('Sets various properties of a part');
    }
};

// Event Blocks
Blockly.Blocks['roblox_on_touched'] = {
    init: function() {
        this.appendValueInput('INSTANCE')
            .setCheck(null)
            .appendField('when');
        this.appendDummyInput()
            .appendField('is touched');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4CAF50');
        this.setTooltip('Runs code when an instance is touched');
    }
};

Blockly.Blocks['roblox_on_player_added'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('when player joins');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4CAF50');
        this.setTooltip('Runs code when a player joins the game');
    }
};

// User Input Blocks
Blockly.Blocks['roblox_on_input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldDropdown([
                ['any key', 'InputBegan'],
                ['key pressed', 'InputBegan'],
                ['key released', 'InputEnded'],
                ['mouse button', 'MouseButton1Down'],
                ['mouse moved', 'MouseMoved']
            ]), 'INPUT_TYPE');
        this.appendStatementInput('DO')
            .setCheck(null)
            .appendField('do');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4CAF50');
        this.setTooltip('Handles user input events');
    }
};

// Game Service Blocks
Blockly.Blocks['roblox_get_service'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('get service')
            .appendField(new Blockly.FieldDropdown([
                ['Players', 'Players'],
                ['Workspace', 'Workspace'],
                ['ReplicatedStorage', 'ReplicatedStorage'],
                ['ServerStorage', 'ServerStorage'],
                ['TweenService', 'TweenService'],
                ['UserInputService', 'UserInputService'],
                ['Debris', 'Debris']
            ]), 'SERVICE');
        this.setOutput(true, null);
        this.setColour('#2196F3');
        this.setTooltip('Gets a Roblox service');
    }
};

// Data Types
Blockly.Blocks['roblox_vector3'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck('Number')
            .appendField('Vector3.new(');
        this.appendValueInput('Y')
            .setCheck('Number')
            .appendField(',');
        this.appendValueInput('Z')
            .setCheck('Number')
            .appendField(',');
        this.appendDummyInput()
            .appendField(')');
        this.setOutput(true, 'Vector3');
        this.setColour('#9C27B0');
        this.setTooltip('Creates a new Vector3');
    }
};

Blockly.Blocks['roblox_color3'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('Color3')
            .appendField(new Blockly.FieldDropdown([
                ['fromRGB', 'fromRGB'],
                ['fromHSV', 'fromHSV']
            ]), 'COLOR_TYPE');
        this.appendValueInput('R')
            .setCheck('Number');
        this.appendValueInput('G')
            .setCheck('Number')
            .appendField(',');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField(',');
        this.setOutput(true, 'Color3');
        this.setColour('#9C27B0');
        this.setTooltip('Creates a new Color3');
    }
};

// Physics Blocks
Blockly.Blocks['roblox_apply_force'] = {
    init: function() {
        this.appendValueInput('INSTANCE')
            .setCheck(null)
            .appendField('apply force to');
        this.appendValueInput('FORCE')
            .setCheck('Vector3')
            .appendField('force');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF9800');
        this.setTooltip('Applies a force to a part');
    }
};

// Tween Blocks
Blockly.Blocks['roblox_tween'] = {
    init: function() {
        this.appendValueInput('INSTANCE')
            .setCheck(null)
            .appendField('tween');
        this.appendDummyInput()
            .appendField('for')
            .appendField(new Blockly.FieldNumber(1), 'DURATION')
            .appendField('seconds');
        this.appendDummyInput()
            .appendField('style')
            .appendField(new Blockly.FieldDropdown([
                ['Linear', 'Linear'],
                ['Sine', 'Sine'],
                ['Quad', 'Quad'],
                ['Elastic', 'Elastic'],
                ['Bounce', 'Bounce']
            ]), 'STYLE');
        this.appendStatementInput('PROPERTIES')
            .setCheck(null)
            .appendField('properties');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF9800');
        this.setTooltip('Creates a tween animation');
    }
};

// UI Blocks
Blockly.Blocks['roblox_create_gui'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('create')
            .appendField(new Blockly.FieldDropdown([
                ['Frame', 'Frame'],
                ['TextLabel', 'TextLabel'],
                ['TextButton', 'TextButton'],
                ['ImageLabel', 'ImageLabel'],
                ['ImageButton', 'ImageButton']
            ]), 'GUI_TYPE');
        this.appendValueInput('PARENT')
            .setCheck(null)
            .appendField('in');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#673AB7');
        this.setTooltip('Creates a GUI element');
    }
};

// Sound Blocks
Blockly.Blocks['roblox_play_sound'] = {
    init: function() {
        this.appendValueInput('SOUND_ID')
            .setCheck('String')
            .appendField('play sound with ID');
        this.appendDummyInput()
            .appendField('volume')
            .appendField(new Blockly.FieldNumber(1, 0, 10), 'VOLUME')
            .appendField('pitch')
            .appendField(new Blockly.FieldNumber(1, 0.1, 3), 'PITCH');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#673AB7');
        this.setTooltip('Plays a sound using its asset ID');
    }
};
