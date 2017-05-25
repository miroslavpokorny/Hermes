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
# Python script used to download and extract dependency libraries.
# It download:
#  > google closure library
#  > google closure compiler
#  > google protocol buffers library
# Urls for libraries are defined in dependency.ini configuration file
# Script also update build.ini configuration file

from __future__ import print_function
from __future__ import division
import ConfigParser
import urllib2
from StringIO import StringIO
import os
import zipfile


class Dependency:
    def __init__(self, url, version):
        self.url = url
        self.version = version


def download(url, name):
    print("Downloading {0}...  0%".format(name), end="")
    response = urllib2.urlopen(url)
    size = response.info().getheader("Content-Length").strip()
    size = int(size)
    zipData = StringIO()
    readSize = 0
    while True:
        data = response.read(8192)
        if not data:
            break
        zipData.write(data)
        readSize += len(data)
        print ("\b\b\b\b{:3}%".format(int(readSize/size*100)), end="")
    print("")
    return zipData


def extract_all(zipData, name, path):
    zip = zipfile.ZipFile(zipData)
    i = 0
    names = zip.namelist()
    print("Extracting {0}...  0%".format(name), end="")
    for zipItem in names:
        if not (name == "PROTOBUF" and "test" in str(zipItem).lower() and ".js" in str(zipItem).lower()):
            zip.extract(zipItem, path)
        i += 1
        print("\b\b\b\b{:3}%".format(int(i / len(names) * 100)), end="")
    print("")

def write_build_file():
    print("Creating build.ini file...", end="")
    buildFile = open("build.ini", "w")
    buildFile.write("\n".join(["[LIBRARY]", "Root = HermesJS", "OutFile = out/HermesJS.js"]) + "\n\n")
    buildFile.write("\n".join(["[NAMESPACES]", "CompileNamespace = HermesJS.main"]) + "\n\n")
    buildFile.write("\n".join(["[CLOSURE]",
                               "Library = closure-library/closure-library-" + deps[CLOSURE_LIBRARY].version,
                               "Compiler = closure-compiler/closure-compiler-v" + deps[
                                   CLOSURE_COMPILER].version + ".jar"]) + "\n\n")
    buildFile.write("\n".join(["[PROTOBUF]", "Library = protobuf/protobuf-" + deps[PROTOBUF].version + "/js"]) + "\n\n")
    buildFile.close()
    print("100%")

config = ConfigParser.ConfigParser()
config.read("dependency.ini")

deps = [
    Dependency(url=config.get("CLOSURE_LIBRARY", "url"), version=config.get("CLOSURE_LIBRARY", "version")),
    Dependency(url=config.get("CLOSURE_COMPILER", "url"), version=config.get("CLOSURE_COMPILER", "version")),
    Dependency(url=config.get("PROTOBUF", "url"), version=config.get("PROTOBUF", "version"))
]

CLOSURE_LIBRARY = 0
CLOSURE_COMPILER = 1
PROTOBUF = 2

extract_all(download(deps[CLOSURE_LIBRARY].url, "CLOSURE LIBRARY"), "CLOSURE LIBRARY", os.path.join(os.getcwd(), "closure-library"))
extract_all(download(deps[CLOSURE_COMPILER].url, "CLOSURE COMPILER"), "CLOSURE COMPILER", os.path.join(os.getcwd(), "closure-compiler"))
extract_all(download(deps[PROTOBUF].url, "PROTOBUF"), "PROTOBUF", os.path.join(os.getcwd(), "protobuf"))
write_build_file()
