import bpy
import os
import sys

def run_export():
    blend_path = bpy.data.filepath
    if not blend_path:
        print("[Pandharpur Exporter] No active blend file loaded.")
        return

    blend_dir = os.path.dirname(blend_path)
    blend_name = os.path.splitext(os.path.basename(blend_path))[0]

    project_dir = os.path.abspath(os.path.join(blend_dir, ".."))
    models_dir = os.path.join(project_dir, "public", "models")

    if not os.path.exists(models_dir):
        fallback_dir = r"d:\proj\Pandharpur-City-Simulator\public\models"
        if os.path.exists(fallback_dir):
            models_dir = fallback_dir
        else:
            os.makedirs(models_dir, exist_ok=True)

    output_path = os.path.join(models_dir, f"{blend_name}.glb")

    print(f"[Pandharpur Exporter] Exporting {blend_path} -> {output_path}...")
    try:
        bpy.ops.export_scene.gltf(
            filepath=output_path,
            export_format='GLB',
            use_selection=False,
            export_apply=True,
            export_yup=True,
            export_texcoords=True,
            export_normals=True,
            export_materials='EXPORT',
            export_colors=True,
            export_cameras=False,
            export_lights=False
        )
        print(f"[Pandharpur Exporter] Success: {output_path}")
    except Exception as err:
        print(f"[Pandharpur Exporter] Failed: {err}")
        sys.exit(1)

if __name__ == "__main__":
    run_export()

