#ifdef __EMSCRIPTEN__
	#include <emscripten/emscripten.h>
	#include "webcurses.h"
#else
	#include <ncurses.h>
#endif

#include <time.h>
#include <stdlib.h>

#include <stdio.h>

int main() {
	srand(time(NULL));
	initscr();
	noecho();
	curs_set(0);
	char ch;
	while ((ch = getch())) {
		if (ch == 'q') {
			break;
		}
		mvaddch(random() % 15 + 1, random() % 25 + 1, ch);
	}
	printf("lala\n");
	endwin();
}
