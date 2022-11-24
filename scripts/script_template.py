import subprocess, os.path, json


print("Welcome to v0 of this script!\n")
data = {}
# Opening JSON file
with open('script-config.json', 'r') as f:
    # returns JSON object as a dictionary
    data = json.load(f)
  
if data == {}:
    print("Failed to load JSON file. Exiting!")
    quit()

pluginDict = data['clang-plugins']
fileList = data['make_cfiles']

#### LINKS ####

print("Downloading required plugins. Please wait.")
for plugin in pluginDict:
    if os.path.isfile(f"{plugin}.so"): continue
    output=subprocess.getoutput(f"curl -L0 https://github.com/majanojoel/ECE496_ClangPlugins/raw/main/libraries/{plugin}.so -o {plugin}.so")
    # Check if plugin downloaded
    if not os.path.isfile(f"{plugin}.so"):
        print (f"Couldn't download {plugin}.so. Exiting!")
        quit()

print("#### Plugins downloaded. Running checks next. ####")

testsPassed = True
######## Checks ##############
for file in fileList:
    for plugin, pluginArg in pluginDict.items():
        print(f"### Running {plugin} check ###\n")
        argString = ''
        if pluginArg != '': argString = f" -fplugin-arg-{plugin}-{pluginArg}"
        output=subprocess.getoutput(f"clang -fplugin={plugin}.so{argString} -c {file}.c")
        print(output)
        if("Error" in output): testsPassed = False

######## Compilation #########
if(testsPassed):
    print("All checks passed, running make next!")
    output = subprocess.getoutput("make")
    print(output)
    print("Script complete! Please test your program or if make failed, fix the problems and run again.")
else: print("One or more tests failed. Please fix the errors in your code and retry running the script.")
    
