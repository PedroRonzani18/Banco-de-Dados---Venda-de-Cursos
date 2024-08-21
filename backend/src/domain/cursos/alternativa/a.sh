#!/bin/bash

# Get the current directory
current_dir=$(pwd)

# Loop through all files and folders in the current directory
for file in "$current_dir"/*; do
    # Check if it's a file or a directory
    if [ -f "$file" ]; then
        # Replace "Trail" with "Alternativa" in the file name
        new_file_name=$(basename "$file" | sed 's/Trail/Alternativa/g')
        # Check if the new file name is different from the original name
        if [ "$new_file_name" != "$(basename "$file")" ]; then
            # Rename the file
            mv "$file" "$current_dir/$new_file_name"
        fi
    elif [ -d "$file" ]; then
        # Replace "Trail" with "Alternativa" in the folder name
        new_folder_name=$(basename "$file" | sed 's/Trail/Alternativa/g')
        # Check if the new folder name is different from the original name
        if [ "$new_folder_name" != "$(basename "$file")" ]; then
            # Rename the folder
            mv "$file" "$current_dir/$new_folder_name"
        fi
    fi
done