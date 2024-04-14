/*
    MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/*
    This interface will store your plugin settings
*/

interface MyPluginSettings
{
	mySetting: string;
}

/*
    This will store your default settings if a setting has not yet been customized
*/

const DEFAULT_SETTINGS: MyPluginSettings =
{
	mySetting: 'default'
}

/*
    This is your plugin's main class where your plugin's initialization will be ran.
*/

export default class MyPlugin extends Plugin
{
	settings: MyPluginSettings;

    /*
        This method is called when your plugin first loads
    */

	async onload()
    {
		await this.loadSettings();

        /*
            Creates an icon within the left ribbon of Obsidian's interface
            
            dice            : Name of the icon to use
            Same Plugin     : Text that will appear when you place your mouse cursor over the ribbon icon
        */

		const ribbonIconEl = this.addRibbonIcon( 'dice', 'Sample Plugin', (evt: MouseEvent) =>
        {
			new Notice( 'This is a notice that will appear when the ribbon icon is clicked.' );
		});

        /*
            Add a new CSS class to the ribbon you created above
        */

		ribbonIconEl.addClass('my-plugin-ribbon-class');

        /*
            Add a status bar item to the bottom of the Obsidian interface.
            This however, does not work on the mobile app.
        */

		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText( 'My status bar text' );

        /*
            Adds a command that can be triggered anywhere
        */

		this.addCommand(
        {
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () =>
            {
				new SampleModal(this.app).open();
			}
		});

        /*
            Adds a command that can perform the same operation on the current instance
        */

		this.addCommand(
        {
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) =>
            {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

        /*
            Adds a command that can check whether the current state of the app allows execution of the command
        */

		this.addCommand(
        {
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) =>
            {

                /*
                    Add a condition to check for when the user clicks
                */

				const markdownView = this.app.workspace.getActiveViewOfType( MarkdownView );
				if ( markdownView )
                {

                    /*
                        If TRUE: we're checking if the command can be run.
                        if FALSE: we need to perform the operation
                    */

					if ( !checking )
                    {
						new SampleModal( this.app ).open();
					}

                    /*
                        This command will only show up in Command Palette when the check function returns true
                    */

					return true;
				}
			}
		});

        /*
            This will add a new tab within the plugin settings where users will customize how the plugin works
        */

		this.addSettingTab( new SampleSettingTab( this.app, this ) );

        /*
            If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
            Using this function will automatically remove the event listener when this plugin is disabled.
        */

		this.registerDomEvent( document, 'click', (evt: MouseEvent) =>
        {
			console.log( 'click', evt );
		});

        /*
            When registering intervals, this function will automatically clear the interval when the plugin is disabled.
        */

            this.registerInterval( window.setInterval( () =>
            console.log( 'setInterval' ), 5 * 60 * 1000 ));
	}

    /*
        This method is called when your plugin is unloaded
    */

	onunload()
    {
        console.debug( "Your plugin has been unloaded" )
	}

    /*
        This is called when the settings for your plugin are loaded
    */

	async loadSettings()
    {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

    /*
        This method is called when the settings for your plugin are saved
    */

	async saveSettings()
    {
		await this.saveData( this.settings );
	}
}

/*
    Sample Modal

    this can be used to have dialogs or new windows appear when a user does or clicks something.
*/

class SampleModal extends Modal
{
	constructor( app: App )
    {
		super( app );
	}

    /*
        Method called when your dialog window opens
    */

	onOpen()
    {
		const { contentEl } = this;
		contentEl.setText('This works');
	}

    /*
        Method called when your dialog window closes
    */

	onClose()
    {
		const { contentEl } = this;
		contentEl.empty();
	}
}

/*
    This class will store the settings you wish to add that users will be able to customize
    in the obsidian plugin settings.
*/

class SampleSettingTab extends PluginSettingTab
{
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin)
    {
		super(app, plugin);
		this.plugin = plugin;
	}

    /*
        Methis is called when your plugin's setting tab is opened

        containerEl     : this is the parent panel, you will create children elements within this top element
    */

	display(): void
    {

        /*
            Clear / empty the parent element 'containerEl', after this section the content will be re-generated.
        */

		const {containerEl} = this;
		containerEl.empty();

        /*
            This is your first setting, as noted above, it will be attached to the parent element 'containerEl'
        */

		new Setting(containerEl)
			.setName('This is a Heading')
			.setDesc('This section allows you to edit a settings for this plugin')
			.addText(text => text
				.setPlaceholder('Enter a placeholder')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) =>
                {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}