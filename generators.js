'use strict';

// Basic Blocks Generators
Blockly.Lua['roblox_print'] = function(block) {
    const text = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_ATOMIC) || '""';
    return 'print(' + text + ')\n';
};

Blockly.Lua['roblox_wait'] = function(block) {
    const seconds = Blockly.Lua.valueToCode(block, 'SECONDS', Blockly.Lua.ORDER_ATOMIC) || '0';
    return 'wait(' + seconds + ')\n';
};

Blockly.Lua['roblox_comment'] = function(block) {
    const comment = block.getFieldValue('COMMENT');
    return '-- ' + comment + '\n';
};

// Instance Creation Generators
Blockly.Lua['roblox_part_create'] = function(block) {
    const type = block.getFieldValue('TYPE');
    const name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC) || '"Instance"';
    const parent = block.getFieldValue('PARENT');
    
    let code = `local instance = Instance.new("${type}")\n`;
    code += `instance.Name = ${name}\n`;
    code += `instance.Parent = ${parent}\n`;
    return code;
};

// Part Manipulation Generators
Blockly.Lua['roblox_part_properties'] = function(block) {
    const instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC) || 'instance';
    const sizeX = block.getFieldValue('SIZE_X');
    const sizeY = block.getFieldValue('SIZE_Y');
    const sizeZ = block.getFieldValue('SIZE_Z');
    const color = block.getFieldValue('COLOR');
    const transparency = block.getFieldValue('TRANSPARENCY');
    
    // Convert hex color to RGB
    const r = parseInt(color.substring(1,3), 16);
    const g = parseInt(color.substring(3,5), 16);
    const b = parseInt(color.substring(5,7), 16);
    
    let code = `${instance}.Size = Vector3.new(${sizeX}, ${sizeY}, ${sizeZ})\n`;
    code += `${instance}.Color = Color3.fromRGB(${r}, ${g}, ${b})\n`;
    code += `${instance}.Transparency = ${transparency}\n`;
    return code;
};

// Event Generators
Blockly.Lua['roblox_on_touched'] = function(block) {
    const instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC) || 'instance';
    const statements = Blockly.Lua.statementToCode(block, 'DO') || '';
    
    return `${instance}.Touched:Connect(function(hit)\n${statements}end)\n`;
};

Blockly.Lua['roblox_on_player_added'] = function(block) {
    const statements = Blockly.Lua.statementToCode(block, 'DO') || '';
    
    return `game:GetService("Players").PlayerAdded:Connect(function(player)\n${statements}end)\n`;
};

// User Input Generators
Blockly.Lua['roblox_on_input'] = function(block) {
    const inputType = block.getFieldValue('INPUT_TYPE');
    const statements = Blockly.Lua.statementToCode(block, 'DO') || '';
    
    let code = `game:GetService("UserInputService").${inputType}:Connect(function(input)\n`;
    code += `    if input.UserInputType == Enum.UserInputType.Keyboard then\n`;
    code += statements;
    code += `    end\n`;
    code += `end)\n`;
    return code;
};

// Game Service Generators
Blockly.Lua['roblox_get_service'] = function(block) {
    const service = block.getFieldValue('SERVICE');
    return [`game:GetService("${service}")`, Blockly.Lua.ORDER_ATOMIC];
};

// Data Type Generators
Blockly.Lua['roblox_vector3'] = function(block) {
    const x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_ATOMIC) || '0';
    const y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_ATOMIC) || '0';
    const z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_ATOMIC) || '0';
    
    return [`Vector3.new(${x}, ${y}, ${z})`, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Lua['roblox_color3'] = function(block) {
    const colorType = block.getFieldValue('COLOR_TYPE');
    const r = Blockly.Lua.valueToCode(block, 'R', Blockly.Lua.ORDER_ATOMIC) || '0';
    const g = Blockly.Lua.valueToCode(block, 'G', Blockly.Lua.ORDER_ATOMIC) || '0';
    const b = Blockly.Lua.valueToCode(block, 'B', Blockly.Lua.ORDER_ATOMIC) || '0';
    
    return [`Color3.${colorType}(${r}, ${g}, ${b})`, Blockly.Lua.ORDER_ATOMIC];
};

// Physics Generators
Blockly.Lua['roblox_apply_force'] = function(block) {
    const instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC) || 'instance';
    const force = Blockly.Lua.valueToCode(block, 'FORCE', Blockly.Lua.ORDER_ATOMIC) || 'Vector3.new(0, 0, 0)';
    
    return `if ${instance}:IsA("BasePart") and ${instance}:FindFirstChild("BodyForce") then\n` +
           `    ${instance}.BodyForce.Force = ${force}\n` +
           `else\n` +
           `    local bf = Instance.new("BodyForce")\n` +
           `    bf.Force = ${force}\n` +
           `    bf.Parent = ${instance}\n` +
           `end\n`;
};

// Tween Generators
Blockly.Lua['roblox_tween'] = function(block) {
    const instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC) || 'instance';
    const duration = block.getFieldValue('DURATION');
    const style = block.getFieldValue('STYLE');
    const properties = Blockly.Lua.statementToCode(block, 'PROPERTIES') || '';
    
    let code = `local tweenInfo = TweenInfo.new(\n`;
    code += `    ${duration},\n`;
    code += `    Enum.EasingStyle.${style},\n`;
    code += `    Enum.EasingDirection.Out\n`;
    code += `)\n\n`;
    code += `local tween = game:GetService("TweenService"):Create(${instance}, tweenInfo, {\n`;
    code += properties;
    code += `})\n`;
    code += `tween:Play()\n`;
    
    return code;
};

// UI Generators
Blockly.Lua['roblox_create_gui'] = function(block) {
    const guiType = block.getFieldValue('GUI_TYPE');
    const parent = Blockly.Lua.valueToCode(block, 'PARENT', Blockly.Lua.ORDER_ATOMIC) || 'game.Players.LocalPlayer.PlayerGui';
    
    let code = `local gui = Instance.new("${guiType}")\n`;
    code += `gui.Parent = ${parent}\n`;
    
    // Add default properties based on GUI type
    switch(guiType) {
        case 'Frame':
            code += `gui.Size = UDim2.new(0, 200, 0, 200)\n`;
            code += `gui.Position = UDim2.new(0.5, -100, 0.5, -100)\n`;
            break;
        case 'TextLabel':
        case 'TextButton':
            code += `gui.Size = UDim2.new(0, 200, 0, 50)\n`;
            code += `gui.Position = UDim2.new(0.5, -100, 0.5, -25)\n`;
            code += `gui.Text = "New ${guiType}"\n`;
            break;
        case 'ImageLabel':
        case 'ImageButton':
            code += `gui.Size = UDim2.new(0, 100, 0, 100)\n`;
            code += `gui.Position = UDim2.new(0.5, -50, 0.5, -50)\n`;
            break;
    }
    
    return code;
};

// Sound Generators
Blockly.Lua['roblox_play_sound'] = function(block) {
    const soundId = Blockly.Lua.valueToCode(block, 'SOUND_ID', Blockly.Lua.ORDER_ATOMIC) || '""';
    const volume = block.getFieldValue('VOLUME');
    const pitch = block.getFieldValue('PITCH');
    
    let code = `local sound = Instance.new("Sound")\n`;
    code += `sound.SoundId = "rbxassetid://" .. ${soundId}\n`;
    code += `sound.Volume = ${volume}\n`;
    code += `sound.Pitch = ${pitch}\n`;
    code += `sound.Parent = workspace\n`;
    code += `sound:Play()\n`;
    code += `game:GetService("Debris"):AddItem(sound, sound.TimeLength)\n`;
    
    return code;
};
