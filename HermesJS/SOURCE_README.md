#HermesJS - sources
The HermesJS library is distributed without Closure library, Closure compiler, and protocol buffers library. 

##Requirements
For successful enable of compiler and code editing in IDE you must have installed:
* Java - used by closure compiler
* python 2.7 - used by *closurebuilder.py* script for recognizing dependency tree and by other useful scripts located at the root of this directory.
* node.js with npm - used for downloading and executing some tools.

##Enable compiler
For enabling compiling you must download these dependencies. There are two ways how to do it. The first way is to use *install.bat* batch file. 
Install.bat file executes these scripts:

1. Execute *install-closure-ts.bat* batch file which downloads and install globally closure-ts npm package which is used to generate TypeScript definition files for closure library
2. Execute *download_dependency.py* python script which downloads and extracts Closure library, Closure compiler, and Protocol buffers library from sources defined in *dependency.ini* file and generate *build.ini* file.
3. Execute *gen_ts_d.py* python script which generates TypeScript definition files for Closure library using a *closure-ts* tool.

Scripts could by executed separately in this order.

If this method fails you must download and extract these dependencies manually.

1. Download latest google closure library available [here](https://github.com/google/closure-library/releases) and extract it to *closure-library* directory
    1. Check *build.ini* file if value Library in CLOSURE section is same as the path to extracted directory
    
2. Download latest google closure compiler available [here](https://dl.google.com/closure-compiler/compiler-latest.zip) or [here](https://developers.google.com/closure/compiler/) and extract compiler to *closure-compiler* directory
    1. Check *build.ini* file if value Compiler in CLOSURE section is same as the path to extracted compiler
3. Download latest google protocol buffers 3 library (javascript version) available [here](https://github.com/google/protobuf/releases) and extract it to *protobuf* directory
    1. Check *build.ini* file if value Library in PROTOBUF section target to js directory of downloaded and extracted protocol buffers library
    2. Try run *build.bat* batch file if there is an error with \*test\*.js file in protocol buffers library, then delete all \*.js file with *"test"* in its name, after these files are deleted try run build.bat again
4. Install (if not installed) closure-ts npm package (node.js must be installed) via "npm install -g closure-ts" command
    1. Try run *gen_ts_d.py* python script located in the root of this directory, this file may generate typescript definition files for currently used closure library

##Compile code
To compile source code you can run *build.bat* or *build-debug.bat* which execute *build.py* python script (if *"build.py --debug"* is used compiled code will be more human readable) which resolves dependency tree and executes closure compiler. *build.bat* file at end call *post-build.bat* file which updates HermesJS library in **HermesSample** project. 

##Visual studio setup
It si possible that visual studio will show errors because of missing closure library, you must add closure library to project files.

