#!/usr/bin/env python3
"""
Read and write to files
"""
import sys
from typing import Union

FILE_PATH = "file.txt"
TARGET_PATH = "target.txt"


def read_write() -> Union[bool, None]:
    """
    Reads text from a file and writes the content to a
    destination text file.
    If the destination file doesn't exist, create it.
    """
    try:
        src = sys.argv[1]
    except IndexError:
        return None

    # check files extension
    if src.rsplit('.', 1)[1] != 'txt':
        return None
    try:
        with open(src, "r", encoding='utf-8') as text_file:
            with open(TARGET_PATH, "w", encoding='utf-8') as dest_file:
                buffer = [line for line in text_file]
                dest_file.writelines(buffer)
        return True
    except IOError:
        return False


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Not enough arguments')
    else:
        print(read_write())
