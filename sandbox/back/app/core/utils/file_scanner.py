from pathlib import Path
from datetime import datetime

def scan_folder(base_path, include_ext=None, exclude_patterns=None):
    base = Path(base_path).expanduser()
    files = list(base.rglob("*"))

    def is_valid(f):
        return (
            f.is_file()
            and (not include_ext or f.suffix in include_ext)
            and all(p not in f.name for p in (exclude_patterns or []))
        )

    def file_info(f: Path):
        stat = f.stat()
        return {
            "id": f"{f.stem}_{stat.st_mtime_ns}",  # crude UID
            "name": f.name,
            "path": str(f),
            "ext": f.suffix,
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
        }

    return [file_info(f) for f in files if is_valid(f)]
