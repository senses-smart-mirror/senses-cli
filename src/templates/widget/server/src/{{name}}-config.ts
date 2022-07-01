const {{name}}Config: SmartMirror.IWidgetConfig = {
	name: '{{simpleName}}',
	icon: 'fad fa-align-justify',
	helper: true,
	link: "your_url_link",
	author: "your_name_here",
	version: "0.0.1",
	settings: [{
		name: "title",
		displayOnly: true,
		label: "Label",
		order: 1,
		type: 'text',
		description: "{{simpleName}} description"
	}, {
		name: "header",
		label: "Widget Title",
		type: 'input',
		value: "{{simpleName}}",
		description: "The header title of the widget."
	}]
}

module.exports = {{simpleName}}Config;
