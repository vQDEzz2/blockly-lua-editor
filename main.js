var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
});

function updateCode(event) {
  var code = Blockly.Lua.workspaceToCode(workspace);
  document.getElementById('code').textContent = code;
}

workspace.addChangeListener(updateCode);
