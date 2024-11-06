'use strict';

// Workspace Configuration
const WORKSPACE_CONFIG = {
    grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    trashcan: true,
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    },
    theme: {
        'blockStyles': {
            'logic_blocks': { 'colourPrimary': '#AF5D24' },
            'loop_blocks': { 'colourPrimary': '#5BA55B' },
            'math_blocks': { 'colourPrimary': '#5B67A5' },
            'text_blocks': { 'colourPrimary': '#5BA58C' },
            'list_blocks': { 'colourPrimary': '#745BA5' },
            'colour_blocks': { 'colourPrimary': '#A5745B' },
            'variable_blocks': { 'colourPrimary': '#A55B80' },
            'procedure_blocks': { 'colourPrimary': '#995BA5' }
        },
        'componentStyles': {
            'workspaceBackgroundColour': '#F9F9F9',
            'toolboxBackgroundColour': '#2C3E50',
            'toolboxForegroundColour': '#FFFFFF',
            'flyoutBackgroundColour': '#364D63',
            'flyoutForegroundColour': '#FFFFFF',
            'flyoutOpacity': 0.9,
            'scrollbarColour': '#797979',
            'insertionMarkerColour': '#fff',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.4,
            'cursorColour': '#d0d0d0'
        }
    }
};

// Dark theme configuration
const DARK_THEME = {
    ...WORKSPACE_CONFIG.theme,
    'componentStyles': {
        ...WORKSPACE_CONFIG.theme.componentStyles,
        'workspaceBackgroundColour': '#1E1E1E',
        'toolboxBackgroundColour': '#2D2D2D',
        'flyoutBackgroundColour': '#252526',
        'flyoutForegroundColour': '#CCCCCC',
    }
};

class WorkspaceManager {
    constructor() {
        this.workspace = null;
        this.editor = null;
        this.isDarkMode = false;
        this.autoSaveInterval = null;
    }

    // Initialize the Blockly workspace
    init() {
        // Initialize workspace
        this.workspace = Blockly.inject('blocklyDiv', WORKSPACE_CONFIG);
        
        // Initialize toolbox
        initToolbox(this.workspace);
        
        // Initialize Ace editor
        this.initEditor();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load last saved state
        this.loadLastState();
        
        // Start auto-save
        this.startAutoSave();
        
        // Register custom keyboard shortcuts
        this.registerKeyboardShortcuts();
    }

    // Initialize Ace editor
    initEditor() {
        this.editor = ace.edit('luaEditor');
        this.editor.setTheme('ace/theme/monokai');
        this.editor.session.setMode('ace/mode/lua');
        this.editor.setReadOnly(true);
        this.editor.setOptions({
            fontSize: '14px',
            showPrintMargin: false,
            showGutter: true,
            highlightActiveLine: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
        });
    }

    // Set up workspace event listeners
    setupEventListeners() {
        // Listen for block changes
        this.workspace.addChangeListener((event) => {
            if (event.type === Blockly.Events.BLOCK_CHANGE ||
                event.type === Blockly.Events.BLOCK_CREATE ||
                event.type === Blockly.Events.BLOCK_DELETE ||
                event.type === Blockly.Events.BLOCK_MOVE) {
                this.updateCode();
            }
        });

        // Listen for viewport changes
        this.workspace.addChangeListener((event) => {
            if (event.type === Blockly.Events.VIEWPORT_CHANGE) {
                this.saveViewport();
            }
        });

        // Listen for window resize
        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    // Update generated code
    updateCode() {
        try {
            const code = Blockly.Lua.workspaceToCode(this.workspace);
            this.editor.setValue(code, -1);
            this.logToConsole('Code generated successfully');
            this.saveWorkspace();
        } catch (error) {
            this.logToConsole('Error generating code: ' + error.message, 'error');
        }
    }

    // Save workspace state
    saveWorkspace() {
        try {
            const xml = Blockly.Xml.workspaceToDom(this.workspace);
            const xmlText = Blockly.Xml.domToText(xml);
            localStorage.setItem('robloxBlocklyWorkspace', xmlText);
            localStorage.setItem('robloxBlocklyLastSave', new Date().toISOString());
        } catch (error) {
            this.logToConsole('Error saving workspace: ' + error.message, 'error');
        }
    }

    // Load last saved state
    loadLastState() {
        try {
            const xmlText = localStorage.getItem('robloxBlocklyWorkspace');
            if (xmlText) {
                const xml = Blockly.Xml.textToDom(xmlText);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
                this.logToConsole('Previous workspace loaded');
            }
        } catch (error) {
            this.logToConsole('Error loading workspace: ' + error.message, 'error');
        }
    }

    // Save viewport state
    saveViewport() {
        const viewportState = {
            scale: this.workspace.getScale(),
            scrollX: this.workspace.scrollX,
            scrollY: this.workspace.scrollY
        };
        localStorage.setItem('robloxBlocklyViewport', JSON.stringify(viewportState));
    }

    // Start auto-save interval
    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.saveWorkspace();
        }, 60000); // Auto-save every minute
    }

    // Toggle dark/light theme
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('theme-dark');
        
        // Update workspace theme
        const theme = this.isDarkMode ? DARK_THEME : WORKSPACE_CONFIG.theme;
        this.workspace.setTheme(theme);
        
        // Update editor theme
        this.editor.setTheme(this.isDarkMode ? 'ace/theme/monokai' : 'ace/theme/github');
        
        // Save theme preference
        localStorage.setItem('robloxBlocklyTheme', this.isDarkMode ? 'dark' : 'light');
    }

    // Register keyboard shortcuts
    registerKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveWorkspace();
                this.logToConsole('Workspace saved');
            }
            
            // Ctrl/Cmd + Z to undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                this.workspace.undo(false);
            }
            
            // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y to redo
            if ((e.ctrlKey || e.metaKey) && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
                e.preventDefault();
                this.workspace.undo(true);
            }
        });
    }

    // Handle window resize
    onResize() {
        // Update Blockly workspace size
        Blockly.svgResize(this.workspace);
        
        // Update editor size
        this.editor.resize();
    }

    // Log messages to console
    logToConsole(message, type = 'info') {
        const consoleOutput = document.getElementById('consoleOutput');
        const timestamp = new Date().toLocaleTimeString();
        const messageClass = type === 'error' ? 'console-error' : 'console-info';
        
        consoleOutput.innerHTML += `
            <div class="${messageClass}">
                <span class="console-timestamp">[${timestamp}]</span>
                <span class="console-message">${message}</span>
            </div>
        `;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Export project
    exportProject() {
        try {
            const xml = Blockly.Xml.workspaceToDom(this.workspace);
            const xmlText = Blockly.Xml.domToText(xml);
            const code = Blockly.Lua.workspaceToCode(this.workspace);
            
            const project = {
                blocks: xmlText,
                code: code,
                version: '1.0.0',
                timestamp: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(project)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'roblox-blockly-project.json';
            a.click();
            
            URL.revokeObjectURL(url);
            this.logToConsole('Project exported successfully');
        } catch (error) {
            this.logToConsole('Error exporting project: ' + error.message, 'error');
        }
    }

    // Import project
    importProject(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const project = JSON.parse(e.target.result);
                const xml = Blockly.Xml.textToDom(project.blocks);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
                this.logToConsole('Project imported successfully');
            } catch (error) {
                this.logToConsole('Error importing project: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Export workspace manager
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkspaceManager;
}
