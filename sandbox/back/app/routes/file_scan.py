from fastapi import APIRouter, Query
from app.core.utils.file_scanner import scan_folder

router = APIRouter()

@router.get("/scan", summary="Scan folder for files", description="Scans a folder recursively for files with allowed extensions, excluding given patterns.")
def scan_files(
    folder: str = Query(..., description="Absolute folder path"),
    ext: str = Query(".py,.ipynb", description="Comma-separated extensions"),
    exclude: str = Query("__init__,node_modules", description="Comma-separated ignore patterns")
):
    extensions = [e.strip() for e in ext.split(",")]
    patterns = [p.strip() for p in exclude.split(",")]
    files = scan_folder(folder, include_ext=extensions, exclude_patterns=patterns)
    return {"count": len(files), "files": files}
