#!/bin/bash

search="$1"
replace="$2"

rename_files_and_folders() {
    local current_dir=$1

    for file in "$current_dir"/*; do
        if [ -f "$file" ]; then
            new_file_name=$(basename "$file" | sed "s/$search/$replace/g")
            if [ "$new_file_name" != "$(basename "$file")" ]; then
                mv "$file" "$current_dir/$new_file_name"
            fi
        elif [ -d "$file" ]; then
            new_folder_name=$(basename "$file" | sed "s/$search/$replace/g")
            if [ "$new_folder_name" != "$(basename "$file")" ]; then
                mv "$file" "$current_dir/$new_folder_name"
            fi
            rename_files_and_folders "$current_dir/$new_folder_name"
        fi
    done
}

replace_text() {
    local file="."

    if [ -d "$file" ]; then
        for f in "$file"/*; do
            replace_text "$f" "$search" "$replace"
        done
    elif [ -f "$file" ]; then
        sed -i "s/$search/$replace/g" "$file"
    fi
}

current_dir=$(pwd)
rename_files_and_folders "$current_dir"

replace_text