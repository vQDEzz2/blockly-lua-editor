'use strict';

// Define the toolbox configuration
const TOOLBOX_CONFIG = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Basics",
            "colour": "#FF4444",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_print"
                },
                {
                    "kind": "block",
                    "type": "roblox_wait"
                },
                {
                    "kind": "block",
                    "type": "roblox_comment"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Instances",
            "colour": "#FF4444",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_part_create",
                    "inputs": {
                        "NAME": {
                            "shadow": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "MyPart"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "roblox_part_properties"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Events",
            "colour": "#4CAF50",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_on_touched"
                },
                {
                    "kind": "block",
                    "type": "roblox_on_player_added"
                },
                {
                    "kind": "block",
                    "type": "roblox_on_input"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Game",
            "colour": "#2196F3",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_get_service"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Physics",
            "colour": "#FF9800",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_apply_force"
                },
                {
                    "kind": "block",
                    "type": "roblox_vector3",
                    "inputs": {
                        "X": {
                            "shadow": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        },
                        "Y": {
                            "shadow": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        },
                        "Z": {
                            "shadow": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Animation",
            "colour": "#FF9800",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_tween"
                }
            ]
        },
        {
            "kind": "category",
            "name": "UI",
            "colour": "#673AB7",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_create_gui"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sound",
            "colour": "#673AB7",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_play_sound",
                    "inputs": {
                        "SOUND_ID": {
                            "shadow": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "1234567"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Data",
            "colour": "#9C27B0",
            "contents": [
                {
                    "kind": "block",
                    "type": "roblox_vector3"
                },
                {
                    "kind": "block",
                    "type": "roblox_color3"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Logic",
            "categorystyle": "logic_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Loops",
            "categorystyle": "loop_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext"
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil"
                },
                {
                    "kind": "block",
                    "type": "controls_for"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Math",
            "categorystyle": "math_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number"
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic"
                },
                {
                    "kind": "block",
                    "type": "math_random_int"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Variables",
            "categorystyle": "variable_category",
            "custom": "VARIABLE"
        },
        {
            "kind": "category",
            "name": "Functions",
            "categorystyle": "procedure_category",
            "custom": "PROCEDURE"
        }
    ]
};

// Function to initialize the toolbox
function initToolbox(workspace) {
    workspace.updateToolbox(TOOLBOX_CONFIG);
    
    // Add custom tooltips
    workspace.registerButtonCallback('CUSTOM_TOOLTIP', function(button) {
        const tooltips = {
            'Basics': 'Basic Roblox operations like print and wait',
            'Instances': 'Create and manipulate Roblox instances',
            'Events': 'Handle game events and user input',
            'Game': 'Access Roblox game services',
            'Physics': 'Manipulate physical properties and forces',
            'Animation': 'Create smooth animations with tweens',
            'UI': 'Create user interface elements',
            'Sound': 'Play sounds and music',
            'Data': 'Work with Roblox data types',
        };
        
        button.setTooltip(tooltips[button.getText()] || '');
    });
}

// Export the toolbox configuration and initialization function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TOOLBOX_CONFIG,
        initToolbox
    };
}
