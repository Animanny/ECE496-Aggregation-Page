## Script Template for Students

The main file to modify is script-config.json. This is what will need to be generated by the web configurator.
The MakefileTemplate should also be modified by the prof through the configurator.

As written currently, this script does support running the plugins on multiple source files, but the Makefile would need to be modified to test.

## Testing the script

Test files are included: ```Makefile, script-config.json, test.c```. 

Simply run ```python3 script_template.py```

## Known Issues

- Only supports one argument per plugin
