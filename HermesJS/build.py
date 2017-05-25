#!/usr/bin/env python
# coding=utf-8
# Written for python 2.7
#
# Copyright 2017 Miroslav Pokorný
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#
#
# Python script used to compile javascript files to one bundle library file.
# Script use closure library closurebuilder.py script to resolve dependency
# tree and then call closure compiler. If script is executed with --debug
# parameter output will be more human readable (non minified).
# Script load configuration from build.ini configuration file.

import ConfigParser
import subprocess
import sys

config = ConfigParser.ConfigParser()
config.read("build.ini")

for arg in sys.argv: 
    debug = arg.replace("-", "").lower() == "debug"	

__closureLibrary__ = config.get("CLOSURE", "Library")
__closureCompiler__ = config.get("CLOSURE", "Compiler")
__libraryRoot__ = config.get("LIBRARY", "Root")
__libraryNamespace__ = config.get("NAMESPACES", "CompileNamespace")
__outFile__ = config.get("LIBRARY", "OutFile")
__protobufLibrary__ = config.get("PROTOBUF", "Library")

arguments = "python \"" + __closureLibrary__ + "/closure/bin/build/closurebuilder.py\" --root=\"" + __closureLibrary__ + "/\" --root=\"" + __libraryRoot__ + "\""" --namespace=\"" + __libraryNamespace__ + "\""
if __protobufLibrary__ != "":
    arguments += " --root=\"" + __protobufLibrary__ + "\""

print (arguments)
print("\n")

process = subprocess.Popen(arguments, stdout=subprocess.PIPE)
process.wait()
if (process.returncode != 0):
    print ("Error during building dependency tree!")
    sys.exit(process.returncode)


print("closurebuilder done!")

stdout = ""
for line in process.stdout:
    stdout += line

print ("Dependency tree:")
jsDeps = ""
for line in stdout.replace("\r\n", "\n").split('\n'):
    jsDeps += " " + line
    print (line)

compilerArgs = "java -jar \"" + __closureCompiler__ + "\" --js_output_file \"" + __outFile__ + "\""
if debug:
    compilerArgs += " --formatting=PRETTY_PRINT --formatting=PRINT_INPUT_DELIMITER --debug"
compilerArgs += jsDeps

print(compilerArgs)
print("\n")

compilerProcess = subprocess.Popen(compilerArgs)
compilerProcess.wait()
