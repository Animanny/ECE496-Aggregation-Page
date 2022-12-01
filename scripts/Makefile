CC = clang++
CFLAGS = -Wall
LDFLAGS =
OBJFILES = test.o test2.o
TARGET = test
all: $(TARGET)
$(TARGET): $(OBJFILES)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJFILES) $(LDFLAGS)
clean:
	rm -f $(OBJFILES) $(TARGET) *~