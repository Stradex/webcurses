var term=null;
var _stack_arg = [];
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

async function waitForKeyPress(timeout) {
	return new Promise((resolve) => {
		var tg=Terminal.prototype.globals;
		//FIXME: Still needs to handle the timeout=0 option.
		let timeout_id=null;
		let return_event =  { key: "Error", keyCode: -1, charCode: -1 };
		let wait_key_handler = function (e) {
			if (timeout < 0) {
				if (timeout_id) clearTimeout(timeout_id);
				tg.releaseEvent(document, "keypress", wait_key_handler, true);
				resolve(event); 
			} else {
				return_event = event;
			}
	  };

		if (timeout > 0) {
			timeout_id = setTimeout(function timeout_code() {
			 tg.releaseEvent(document, "keypress", wait_key_handler, true); 
			 resolve(return_event);
			}, timeout);
		}
		tg.registerEvent(document, 'keypress', wait_key_handler, true);
	});
}
