#!/bin/bash

folder_path="../js"

rm -rf $folder_path/assets/*

cp -r ./dist/assets $folder_path

