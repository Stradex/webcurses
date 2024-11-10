#ifndef WEBCURSES_H
#define WEBCURSES_H

//reference: https://github.com/mirror/ncurses

void initscr();
void noecho();
void curs_set(int vis);
void endwin();


#endif
