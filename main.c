#ifdef __EMSCRIPTEN__
	#include <emscripten/emscripten.h>
	#include "webcurses.h"
#else
	#include <ncurses.h>
#endif

#include <time.h>
#include <stdlib.h>
#include <stdio.h>

#define UI_COLOR_WHITE 		1
#define UI_COLOR_RED 			2
#define UI_COLOR_BLUE 		3
#define UI_COLOR_GREEN 		4
#define UI_COLOR_YELLOW 	5
#define UI_MAX_COLORS 		6

void init_colors() {
	if (has_colors())
	{
		start_color();
		init_pair(UI_COLOR_WHITE, COLOR_WHITE, -1);
		init_pair(UI_COLOR_RED, COLOR_RED, -1);
		init_pair(UI_COLOR_BLUE, COLOR_BLUE, -1);
		init_pair(UI_COLOR_GREEN, COLOR_GREEN, -1);
		init_pair(UI_COLOR_YELLOW, COLOR_YELLOW, -1);
	}
}


int main() {
	srand(time(NULL));
	initscr();
	noecho();
	curs_set(0);
	use_default_colors();
	init_colors();
	char ch;
	char buff[8];
	while ((ch = getch())) {
		if (ch == 'q') {
			break;
		}
		sprintf(buff, "%d", PAIR_NUMBER(ch | COLOR_PAIR(UI_COLOR_BLUE)));	
		mvaddch(random() % 15 + 1, random() % 25 + 1, ch | COLOR_PAIR(random() % (UI_MAX_COLORS - 1) + 1));
	}
	printf("lala\n");
	endwin();
}
