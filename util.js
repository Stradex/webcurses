var term=null;
let _ncurses_colors = [
		'black',
		'red',
		'green',
		'yellow',
		'blue',
		'darkmagenta',
		'darkcyan',
		'white'
];

function ncursesColorToStyle(color_id) {
	return (16 + TermGlobals.nsColors[_ncurses_colors[color_id]])*0x100;
}

function startTerminal() {
	if (term) return;
	term=new Terminal({
		x: 0,
		y: 0,
		rows: 25,
		cols: 100,
		greeting: '%+r +++ Terminal ready. +++ %-r%n',
		id: 1,
		termDiv: 'termDiv',
		crsrBlinkMode: true,
		handler: () => {},
		exitHandler: () => {}
	});
	if (term) { 
		term.open();
	}
}

async function waitForKeyPress() {
	return new Promise((resolve) => {
		var tg=Terminal.prototype.globals;
		tg.registerEvent(document, 'keypress', function handler(e) {
			tg.releaseEvent(document, "keypress", handler, true); 
			resolve(event); 
	   }, true);
	});
}
