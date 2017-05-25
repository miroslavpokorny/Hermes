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
# Python script used to generate definition files for closure library
# For working require installed node.js and npm package closure-ts
# use "npm install -g closure-ts" to install closure-ts package
# Note: Tested on closure library (version 20170124)

from __future__ import print_function
from __future__ import division
import ConfigParser
import os
import subprocess

__excludedFiles__ = ["doc/js/article_test.js", "closure/goog/demos/autocompleteremotedata.js", "closure/goog/demos/autocompleterichremotedata.js", "all.d.ts"]

def traceDir (path, extension = ".js"):
    files = []
    for item in os.listdir(path):
        if os.path.isdir(os.path.join(path, item)):
            files.extend(traceDir(os.path.join(path, item), extension))
            continue
        filename, fileext = os.path.splitext(item)
        if fileext == extension:
            #print (os.path.join(path, item))
            add = True
            for exFile in __excludedFiles__:
                if os.path.join(path, item).replace("\\", "/").endswith(exFile):
                    add = False
                    break
            if add:
                files.append(os.path.join(path, item))
    return files

config = ConfigParser.ConfigParser()
config.read("build.ini")

__closureLibrary__ = config.get("CLOSURE", "Library")

files = traceDir(os.path.join(os.getcwd(), __closureLibrary__))

arg = ""
i = 0
total_files = len(files)
progress = 0
print ("Generating ts.d files for closure library...  0%", end="")
for filename in files:
    arg += "\"" + filename + "\" "
    i += 1
    progress += 1
    if i >= 15 or progress == total_files:
        print ("\b\b\b\b{:3}%".format(int(progress/total_files*100)), end="")
        arg = "closurets " + arg
        # print (arg)
        process = subprocess.Popen(arg, shell=True)
        process.wait()
        arg = ""
        i = 0
print("")

print ("Generating reference files...", end="")
output = open(os.path.join(os.getcwd(), __closureLibrary__) + "/all.d.ts", "w")
files = traceDir(os.path.join(os.getcwd(), __closureLibrary__), ".ts")
for filename in files:
    root = os.path.join(os.getcwd(), __closureLibrary__)
    newFileName = filename.replace(root, "").replace("\\", "/")
    output.write("/// <reference path=\"./" + newFileName[1:] + "\" /> \n")
output.close()
print (" 50%", end="")
output = open(os.path.join(os.getcwd(), "closure-library/closure-library.d.ts"), "w")
path = __closureLibrary__[__closureLibrary__.index("/"):]
output.write("/// <reference path=\"." + path + "/all.d.ts\" /> \n")
output.close()
print ("\b\b\b\b100%", end="\n")

print ("Generation done!")
