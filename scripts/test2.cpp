#include <stdio.h>
#include "test2.h"

//Testing Recursion
void foo(int a) {
    if(a == 10) foo(5);
    return;
}