#!/bin/bash

# Function to recursively replace text in files
replace_text() {
    local file="$1"
    local search="$2"
    local replace="$3"

    # Check if the file is a directory
    if [ -d "$file" ]; then
        # Iterate over all files and subdirectories in the directory
        for f in "$file"/*; do
            # Recursively call the function for each file or subdirectory
            replace_text "$f" "$search" "$replace"
        done
    elif [ -f "$file" ]; then
        # Replace text in the file
        sed -i "s/$search/$replace/g" "$file"
    fi
}

# Replace "Atividade" with "Atividade" in all files and subdirectories
replace_text . "Atividade" "Atividade"