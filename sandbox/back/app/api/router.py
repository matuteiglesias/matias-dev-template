from fastapi import APIRouter
# from app.routes import run_flow, flow_meta, file_scan, file_content
# from app.routes import file_scan
from ..routes import file_scan

router = APIRouter()
# router.include_router(run_flow.router, prefix="/flow")
# router.include_router(flow_meta.router)  # this exposes GET /flow
router.include_router(file_scan.router)
# router.include_router(file_content.router)