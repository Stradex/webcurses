all: compile_wasm compile

compile_wasm:
	emcc main.c webcurses.c -o main.js -sSINGLE_FILE --pre-js termlib_min.js

compile:
	gcc main.c -o main -lncurses
