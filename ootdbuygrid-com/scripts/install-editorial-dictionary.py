"""Install a complete translated editorial dictionary for one supported OOTDBuy language."""
import argparse
import json
import os
import re
import tempfile
from fcntl import LOCK_EX, flock
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"


def translated(node, mapping):
    if isinstance(node, list):
        return [translated(value, mapping) for value in node]
    if isinstance(node, dict):
        return {
            key: translated(value, mapping)
            for key, value in node.items()
            if key not in ("slug", "sources")
        }
    if node not in mapping or not isinstance(mapping[node], str) or not mapping[node].strip():
        raise ValueError(f"Missing or empty translation for {node[:80]!r}")
    return mapping[node].strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("language")
    parser.add_argument("dictionary", type=Path)
    args = parser.parse_args()
    languages = (ROOT / "locale.mjs").read_text().split("};", 1)[0]
    if args.language == "en" or not re.search(r"\b" + re.escape(args.language) + r':\s*"', languages):
        parser.error("Expected a supported non-English locale")
    source = json.loads((CONTENT / "en.json").read_text())
    edition = translated(source, json.loads(args.dictionary.read_text()))
    destination = CONTENT / "locales.json"
    # Lock the directory across atomic replacements of its child file.
    lock = os.open(CONTENT, os.O_RDONLY)
    try:
        flock(lock, LOCK_EX)
        current = json.loads(destination.read_text())
        current[args.language] = edition
        with tempfile.NamedTemporaryFile(mode="w", dir=CONTENT, delete=False) as handle:
            json.dump(current, handle, ensure_ascii=False, separators=(",", ":"))
            handle.write("\n")
            name = handle.name
        os.replace(name, destination)
    finally:
        os.close(lock)


if __name__ == "__main__":
    main()
