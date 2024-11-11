#ifndef WEBCURSES_H
#define WEBCURSES_H

#include <stdbool.h>
#include <stdint.h>

#if 1 && defined(_LP64)
typedef unsigned chtype;
typedef unsigned mmask_t;
#else
typedef uint32_t chtype;
typedef uint32_t mmask_t;
#endif

#define NCURSES_CAST(type,value) (type)(value)
#define NCURSES_ATTR_SHIFT       8
#define NCURSES_BITS(mask,shift) (NCURSES_CAST(chtype,(mask)) << ((shift) + NCURSES_ATTR_SHIFT))
#define A_COLOR         NCURSES_BITS(((1U) << 8) - 1U,0)
#define COLOR_PAIR(n)   (NCURSES_BITS((n), 0) & A_COLOR)
#define PAIR_NUMBER(a)  (NCURSES_CAST(int,((NCURSES_CAST(unsigned long,(a)) & A_COLOR) >> NCURSES_ATTR_SHIFT)))


#define COLOR_BLACK	0
#define COLOR_RED	1
#define COLOR_GREEN	2
#define COLOR_YELLOW	3
#define COLOR_BLUE	4
#define COLOR_MAGENTA	5
#define COLOR_CYAN	6
#define COLOR_WHITE	7

//reference: https://github.com/mirror/ncurses

void initscr();
void noecho();
void curs_set(int vis);
void endwin();
int	getch();
int mvaddch(int y, int x, int ch);
bool has_colors();
int start_color();
int init_pair(short pair, short f, short b);
int pair_content(short pair, short *f, short *b); 
int use_default_colors(void);

#endif
