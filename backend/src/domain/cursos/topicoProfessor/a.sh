#!/bin/bash

# Set the original and after variables
original="topicoProfessor"
after="topicoTopicoProfessor"

# Recursive function to rename files and folders
rename_files_and_folders() {
    local current_dir=$1

    # Loop through all files and folders in the current directory
    for file in "$current_dir"/*; do
        # Check if it's a file or a directory
        if [ -f "$file" ]; then
            # Replace the original with the after in the file name
            new_file_name=$(basename "$file" | sed "s/$original/$after/g")
            # Check if the new file name is different from the original name
            if [ "$new_file_name" != "$(basename "$file")" ]; then
                # Rename the file
                mv "$file" "$current_dir/$new_file_name"
            fi
        elif [ -d "$file" ]; then
            # Replace the original with the after in the folder name
            new_folder_name=$(basename "$file" | sed "s/$original/$after/g")
            # Check if the new folder name is different from the original name
            if [ "$new_folder_name" != "$(basename "$file")" ]; then
                # Rename the folder
                mv "$file" "$current_dir/$new_folder_name"
            fi
            # Recursively call the function for the subfolder
            rename_files_and_folders "$current_dir/$new_folder_name"
        fi
    done
}

# Get the current directory
current_dir=$(pwd)

# Call the recursive function to rename files and folders
rename_files_and_folders "$current_dir"