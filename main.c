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
	printf("lala\n");
	endwin();
}
