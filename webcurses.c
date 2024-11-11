#include <emscripten/emscripten.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include "webcurses.h"

typedef struct {
	short pair;
	short f;
	short b;
	void* next;
} _ColorPair;

_ColorPair* _color_pairs = NULL;

_ColorPair* _get_color_pair(short pair) {
	_ColorPair* p;
	for (p=_color_pairs; p != NULL; p = (_ColorPair*)p->next) {
		if (p->pair == pair) {
			return p;
		}
	}
	return NULL;
}

void initscr() {
	EM_ASM(
		window.startTerminal();
	);
}

void noecho() {
	EM_ASM(
		window.term.clear();
		window.term.lock = true;
		window.term.insert = false;
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

int getch() {
	return _get_ch();
}

int mvaddch(int y, int x, int ch) {
	int pair = PAIR_NUMBER(ch);
	if (pair > 0) {
		short f, b;
		f = 0;
		b = 0;
		pair_content(PAIR_NUMBER(ch), &f, &b);
		EM_ASM({
			window.term.setChar($2, $0, $1, ncursesColorToStyle($3));
		}, y, x, (char)ch, f, b);
	} else {
		EM_ASM({
			window.term.setChar($2, $0, $1);
		}, y, x, (char)ch);
	}
}

int start_color(){
	return 0;
}

bool has_colors() {
	return true;
}


int init_pair(short pair, short f, short b) {
	_ColorPair* new_color_pair = malloc(sizeof(_ColorPair));
	new_color_pair->pair = pair;
	new_color_pair->f = f;
	new_color_pair->b = b;
	new_color_pair->next = NULL;


	if (!_color_pairs) {
		_color_pairs = malloc(sizeof(_ColorPair*));
		_color_pairs = new_color_pair;
		return 1;
	}

	_ColorPair* p;
	for (p=_color_pairs; p->next!=NULL; p = (_ColorPair*)p->next);
	p->next = new_color_pair;
	return 0;
}

int use_default_colors(void) {
	return 0;
}


int pair_content(short pair, short *f, short *b) {
	_ColorPair* p = _get_color_pair(pair);
	if (!p) {
		return 0;
	}
	*f=p->f;
	*b=p->b;
	return 1;
} 
