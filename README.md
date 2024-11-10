# Ncurses for EMScripten

This is a very basic implementation of ncurses for emscripten in order to make work legacy ncurses applications in the browser.
I am using [termlib.js](https://www.masswerk.at/termlib/) for the terminal display.

## USAGE

In order to make ncurses applications to work with EMSCRIPTEN you must add this preprocessor condition to include webcurses.h or ncurses.h depending if you are compiling with **ecc** or **gcc**

```c
#ifdef __EMSCRIPTEN__
	#include <emscripten/emscripten.h>
	#include "webcurses.h"
#else
	#include <ncurses.h>
#endif
#include <ncurses.h>
```

