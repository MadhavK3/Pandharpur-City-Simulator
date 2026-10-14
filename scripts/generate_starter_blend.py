import bpy
import os
import math

def build_vitthal_temple_blend():
    bpy.ops.wm.read_factory_settings(use_empty=True)

    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'METERS'

    # Create root collections
    main_coll = bpy.data.collections.new("Vitthal_Rukmini_Temple")
    scene.collection.children.link(main_coll)

    walls_coll = bpy.data.collections.new("01_Prakara_Walls")
    main_coll.children.link(walls_coll)

    mandap_coll = bpy.data.collections.new("02_Sabha_Mandap")
    main_coll.children.link(mandap_coll)

    shikhara_coll = bpy.data.collections.new("03_Garbhagriha_Shikhara")
    main_coll.children.link(shikhara_coll)

    details_coll = bpy.data.collections.new("04_Finials_And_Details")
    main_coll.children.link(details_coll)

    # Materials
    mat_basalt = bpy.data.materials.new(name="Basalt_Dark_Stone")
    mat_basalt.use_nodes = True
    bsdf_stone = mat_basalt.node_tree.nodes.get("Principled BSDF")
    if bsdf_stone:
        bsdf_stone.inputs["Base Color"].default_value = (0.22, 0.22, 0.24, 1.0)
        bsdf_stone.inputs["Roughness"].default_value = 0.85

    mat_sandstone = bpy.data.materials.new(name="Carved_Sandstone")
    mat_sandstone.use_nodes = True
    bsdf_sand = mat_sandstone.node_tree.nodes.get("Principled BSDF")
    if bsdf_sand:
        bsdf_sand.inputs["Base Color"].default_value = (0.45, 0.42, 0.38, 1.0)
        bsdf_sand.inputs["Roughness"].default_value = 0.70

    mat_gold = bpy.data.materials.new(name="Temple_Gold")
    mat_gold.use_nodes = True
    bsdf_gold = mat_gold.node_tree.nodes.get("Principled BSDF")
    if bsdf_gold:
        bsdf_gold.inputs["Base Color"].default_value = (0.95, 0.75, 0.15, 1.0)
        bsdf_gold.inputs["Metallic"].default_value = 0.90
        bsdf_gold.inputs["Roughness"].default_value = 0.25

    def add_box(coll, name, size, loc, mat):
        # In Three.js: X=X, Y=Up, Z=Z
        # In Blender: X=X, Y=-Z (or Y=Y depending on axis convention), Z=Up
        # When Blender exports to GLTF with Y-up, Blender +Z becomes Three.js +Y, Blender +Y becomes Three.js -Z!
        # So Three.js (x, y, z) maps to Blender (x, -z, y)!
        bx, by, bz = loc[0], -loc[2], loc[1]
        sx, sy, sz = size[0], size[2], size[1]
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(bx, by, bz))
        obj = bpy.context.active_object
        obj.name = name
        obj.scale = (sx, sy, sz)
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        for c in obj.users_collection:
            c.objects.unlink(obj)
        coll.objects.link(obj)
        if mat:
            obj.data.materials.append(mat)
        return obj

    def add_cylinder(coll, name, radius, depth, loc, mat):
        bx, by, bz = loc[0], -loc[2], loc[1]
        bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=(bx, by, bz))
        obj = bpy.context.active_object
        obj.name = name
        for c in obj.users_collection:
            c.objects.unlink(obj)
        coll.objects.link(obj)
        if mat:
            obj.data.materials.append(mat)
        return obj

    def add_cone(coll, name, radius1, depth, loc, mat):
        bx, by, bz = loc[0], -loc[2], loc[1]
        bpy.ops.mesh.primitive_cone_add(radius1=radius1, depth=depth, location=(bx, by, bz))
        obj = bpy.context.active_object
        obj.name = name
        for c in obj.users_collection:
            c.objects.unlink(obj)
        coll.objects.link(obj)
        if mat:
            obj.data.materials.append(mat)
        return obj

    # 1. Jagati Plinth
    add_box(main_coll, "Jagati_Plinth", (32, 1.8, 44), (0, 0.9, 0), mat_basalt)

    # 2. Prakara Enclosure Walls
    add_box(walls_coll, "Wall_North", (52, 5.6, 2.0), (0, 2.8, -28), mat_basalt)
    add_box(walls_coll, "Wall_South", (52, 5.6, 2.0), (0, 2.8, 28), mat_basalt)
    add_box(walls_coll, "Wall_West_Left", (2.0, 5.6, 26), (-25, 2.8, -14), mat_basalt)
    add_box(walls_coll, "Wall_West_Right", (2.0, 5.6, 26), (-25, 2.8, 14), mat_basalt)
    add_box(walls_coll, "Wall_East_Left", (2.0, 5.6, 24), (25, 2.8, -15), mat_basalt)
    add_box(walls_coll, "Wall_East_Right", (2.0, 5.6, 24), (25, 2.8, 15), mat_basalt)

    # Corner Bastions
    for i, (cx, cz) in enumerate([(-25, -28), (-25, 28), (25, -28), (25, 28)]):
        add_cylinder(walls_coll, f"Bastion_Tower_{i+1}", 2.1, 5.6, (cx, 2.8, cz), mat_basalt)
        add_cone(walls_coll, f"Bastion_Roof_{i+1}", 2.3, 1.6, (cx, 6.4, cz), mat_sandstone)

    # 3. Sabha Mandap
    add_box(mandap_coll, "Mandap_Hall", (24, 6.4, 24), (0, 5.0, 6), mat_sandstone)
    add_box(mandap_coll, "Mandap_Roof_Tier1", (22, 1.2, 22), (0, 8.8, 6), mat_sandstone)
    add_box(mandap_coll, "Mandap_Roof_Tier2", (18, 1.2, 18), (0, 10.0, 6), mat_sandstone)
    add_box(mandap_coll, "Mandap_Roof_Tier3", (14, 1.2, 14), (0, 11.2, 6), mat_sandstone)
    add_cone(mandap_coll, "Mandap_Roof_Apex", 7.2, 2.2, (0, 12.4, 6), mat_sandstone)
    add_cone(mandap_coll, "Mandap_Brass_Finial", 1.0, 1.8, (0, 14.0, 6), mat_gold)

    # Mandap Pillars (Front Entrance Porch)
    for px in [-9, -4.5, 0, 4.5, 9]:
        add_cylinder(mandap_coll, f"Mandap_Porch_Pillar_{px}", 0.45, 6.4, (px, 5.0, 19), mat_sandstone)

    # 4. Garbhagriha & Shikhara
    add_box(shikhara_coll, "Sanctum_Garbhagriha", (16, 7.5, 16), (0, 5.55, -12), mat_sandstone)
    add_box(shikhara_coll, "Shikhara_Tier_1", (14.5, 3.2, 14.5), (0, 10.9, -12), mat_sandstone)
    add_box(shikhara_coll, "Shikhara_Tier_2", (12.5, 3.0, 12.5), (0, 14.0, -12), mat_sandstone)
    add_box(shikhara_coll, "Shikhara_Tier_3", (10.5, 2.8, 10.5), (0, 16.9, -12), mat_sandstone)
    add_box(shikhara_coll, "Shikhara_Tier_4", (8.5, 2.6, 8.5), (0, 19.6, -12), mat_sandstone)
    add_cylinder(shikhara_coll, "Amalaka_Disc", 3.8, 1.4, (0, 21.6, -12), mat_sandstone)

    # 5. Golden Kalasha Finial & Bhagwa Flag
    add_cone(details_coll, "Golden_Kalasha_Base", 1.8, 1.8, (0, 23.2, -12), mat_gold)
    add_cylinder(details_coll, "Golden_Kalasha_Spire", 0.35, 2.2, (0, 25.2, -12), mat_gold)
    add_cylinder(details_coll, "Dhvaja_Flagstaff", 0.12, 5.0, (0, 26.5, -12), mat_sandstone)

    # Embed auto_export_on_save.py in Blender text editor with register enabled
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
        print(f"[Pandharpur Live Sync] Auto-exported on save: {output_path}")
    except Exception as err:
        print(f"[Pandharpur Live Sync] Export error: {err}")

# Ensure handler is registered
for h in list(bpy.app.handlers.save_post):
    if getattr(h, '__name__', '') == 'auto_export_glb_on_save':
        bpy.app.handlers.save_post.remove(h)
bpy.app.handlers.save_post.append(auto_export_glb_on_save)
print("[Pandharpur Live Sync] Live sync active. Press Ctrl+S in Blender to update simulator.")
"""
    txt = bpy.data.texts.new("auto_export.py")
    txt.write(script_text)
    txt.use_module = True

    # Save to blender/vitthal_mandir.blend
    out_blend = r"d:\proj\Pandharpur-City-Simulator\blender\vitthal_mandir.blend"
    bpy.ops.wm.save_as_mainfile(filepath=out_blend)
    print(f"[Blend Generated] Saved: {out_blend}")

    # Export to public/models/vitthal_mandir.glb
    out_glb = r"d:\proj\Pandharpur-City-Simulator\public\models\vitthal_mandir.glb"
    bpy.ops.export_scene.gltf(
        filepath=out_glb,
        export_format='GLB',
        use_selection=False,
        export_apply=True,
        export_yup=True
    )
    print(f"[GLB Exported] Saved: {out_glb}")

if __name__ == "__main__":
    build_vitthal_temple_blend()

