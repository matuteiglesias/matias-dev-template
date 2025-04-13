import json
from pathlib import Path
from langchain.text_splitter import RecursiveCharacterTextSplitter

def get_text_splitter(file_type, chunk_size=8000, chunk_overlap=100):
    return RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)

def read_file_content(file_path):
    path = Path(file_path)
    try:
        if path.suffix == ".py":
            with open(path, "r", encoding="utf-8") as f:
                return "\n".join(get_text_splitter("text/plain").split_text(f.read()))

        elif path.suffix == ".ipynb":
            with open(path, "r", encoding="utf-8") as f:
                raw = json.load(f)
            cells = [c for c in raw.get("cells", []) if c["cell_type"] in {"markdown", "code"}]
            text = "\n".join(["".join(c["source"]) for c in cells])
            return "\n".join(get_text_splitter("application/json").split_text(text))

    except Exception as e:
        print(f"❌ Failed reading {file_path}: {e}")
        return ""


import subprocess
import pandas as pd

def get_recent_files(
    root="/home/matias/RAG_master/v2",
    exclude_patterns=None,
    allowed_extensions=None
):
    if exclude_patterns is None:
        exclude_patterns = ["__init__.py", "node_modules"]
    if allowed_extensions is None:
        allowed_extensions = [".py", ".ipynb"]

    cmd = f"find {root} -type f -printf '%TY-%Tm-%Td %TH:%TM %p\n'"
    raw_lines = subprocess.check_output(cmd, shell=True, text=True).strip().split("\n")

    df = pd.DataFrame(raw_lines, columns=["raw"])
    df[["Date", "Time", "FilePath"]] = df["raw"].str.extract(r"^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(.*)$")
    df["Datetime"] = pd.to_datetime(df["Date"] + " " + df["Time"], errors="coerce")
    df = df.drop(columns=["raw", "Date", "Time"])

    for pattern in exclude_patterns:
        df = df[~df["FilePath"].str.contains(pattern)]

    df = df[df["FilePath"].str.endswith(tuple(allowed_extensions))]
    df = df.dropna(subset=["Datetime"]).drop_duplicates("FilePath").sort_values("Datetime", ascending=False)

    df["text"] = df["FilePath"].apply(read_file_content)
    return df
