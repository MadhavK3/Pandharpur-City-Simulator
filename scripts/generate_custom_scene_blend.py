import bpy
import os

def build_custom_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'METERS'

    custom_coll = bpy.data.collections.new("Custom_City_Assets")
    scene.collection.children.link(custom_coll)

    # Embed auto export script
    script_text = """import bpy
import os
from bpy.app.handlers import persistent

@persistent
def auto_export_glb_on_save(dummy):
    blend_path = bpy.data.filepath
    if not blend_path:
        return

    blend_dir = os.path.dirname(blend_path)
    blend_name = os.path.splitext(os.path.basename(blend_path))[0]
    project_dir = os.path.abspath(os.path.join(blend_dir, ".."))
    models_dir = os.path.join(project_dir, "public", "models")
    if not os.path.exists(models_dir):
        os.makedirs(models_dir, exist_ok=True)

    output_path = os.path.join(models_dir, f"{blend_name}.glb")

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
        print(f"[Pandharpur Live Sync] Auto-exported {blend_name}.glb on save.")
    except Exception as err:
        print(f"[Pandharpur Live Sync] Export error: {err}")

for h in list(bpy.app.handlers.save_post):
    if getattr(h, '__name__', '') == 'auto_export_glb_on_save':
        bpy.app.handlers.save_post.remove(h)
bpy.app.handlers.save_post.append(auto_export_glb_on_save)
print("[Pandharpur Live Sync] Auto-export active on Ctrl+S.")
"""
    txt = bpy.data.texts.new("auto_export.py")
    txt.write(script_text)
    txt.use_module = True

    out_blend = r"d:\proj\Pandharpur-City-Simulator\blender\custom_scene.blend"
    bpy.ops.wm.save_as_mainfile(filepath=out_blend)
    print(f"[Custom Scene Blend] Saved: {out_blend}")

if __name__ == "__main__":
    build_custom_scene()

