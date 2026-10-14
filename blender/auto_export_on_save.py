import bpy
import os
from bpy.app.handlers import persistent

@persistent
def auto_export_glb_on_save(dummy):
    blend_path = bpy.data.filepath
    if not blend_path:
        print("[Pandharpur Simulator] Blend file has not been saved yet.")
        return

    blend_dir = os.path.dirname(blend_path)
    blend_name = os.path.splitext(os.path.basename(blend_path))[0]

    # Target: public/models/ in project directory
    project_dir = os.path.abspath(os.path.join(blend_dir, ".."))
    models_dir = os.path.join(project_dir, "public", "models")

    if not os.path.exists(models_dir):
        fallback_dir = r"d:\proj\Pandharpur-City-Simulator\public\models"
        if os.path.exists(fallback_dir):
            models_dir = fallback_dir
        else:
            os.makedirs(models_dir, exist_ok=True)

    output_path = os.path.join(models_dir, f"{blend_name}.glb")

    try:
        # Export GLB with optimal settings for Three.js
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
        print(f"[Pandharpur Simulator] Exported GLB to: {output_path}")
    except Exception as err:
        print(f"[Pandharpur Simulator] Export failed: {err}")

def register():
    for handler in list(bpy.app.handlers.save_post):
        if getattr(handler, '__name__', '') == 'auto_export_glb_on_save':
            bpy.app.handlers.save_post.remove(handler)
    bpy.app.handlers.save_post.append(auto_export_glb_on_save)
    print("[Pandharpur Simulator] Auto-export on save handler registered.")

def unregister():
    for handler in list(bpy.app.handlers.save_post):
        if getattr(handler, '__name__', '') == 'auto_export_glb_on_save':
            bpy.app.handlers.save_post.remove(handler)
    print("[Pandharpur Simulator] Auto-export on save handler unregistered.")

if __name__ == "__main__":
    register()

