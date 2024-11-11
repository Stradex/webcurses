
#include <emscripten/emscripten.h>
#include <stdio.h>
#include "webcurses.h"

void initscr() {
	EM_ASM(
		window.startTerminal();
	);
}

void noecho() {
	EM_ASM(
		window.term.clear();
	);
}

void curs_set(int vis) {
	switch (vis) {
		case 0:
			EM_ASM(
				window.term.cursorOff();
			);
		break;
		case 2:
		case 1:
			EM_ASM(
				window.term.cursorOn();
			);
		break;
	}
}

void endwin() { 
	EM_ASM(
		window.term.close();
	);
}

EM_ASYNC_JS(int, _get_ch, (), {
	return (await waitForKeyPress()).charCode;
});

int	getch() {
	return _get_ch();
}
