#ifdef __EMSCRIPTEN__
	#include <emscripten/emscripten.h>
	#include "webcurses.h"
#else
	#include <ncurses.h>
#endif

#include <stdio.h>

int main() {
	initscr();
	noecho();
	curs_set(1);
	char ch;
	while ((ch = getch())) {
		if (ch == 'q') {
			break;
		}
	}
	printf("lala\n");
	endwin();
}
