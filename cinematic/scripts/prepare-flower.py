"""Evaluate the selected CC0 .blend locally with Blender/bpy 4.5 (auto scripts off).
Usage: python prepare-flower.py /path/to/source.blend [output-folder]
The companion prepare-flower.mjs packs the exported mesh data into web GLBs.
"""
import json
import sys
from pathlib import Path
import bpy

source = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else source.parent
out.mkdir(parents=True, exist_ok=True)
bpy.context.preferences.filepaths.use_scripts_auto_execute = False
bpy.ops.wm.open_mainfile(filepath=str(source), load_ui=False, use_scripts=False)
petals = sorted((o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('Leaf.')), key=lambda o: o.name)
assert len(petals) == 5, 'Expected the five original petals; exclude source camera and lighting geometry'
image = bpy.data.images['FranginiaFlowerWhite.png']
assert image.packed_file, 'The original photographed petal texture must be packed'
(out / 'petal-source.png').write_bytes(image.packed_file.data)
variants = {}
for quality, levels in [('high', 2), ('medium', 1), ('low', 0)]:
    for obj in petals:
        for modifier in obj.modifiers:
            if modifier.type == 'SUBSURF':
                modifier.levels = levels
    bpy.context.view_layer.update()
    depsgraph = bpy.context.evaluated_depsgraph_get()
    parts = []
    for obj in petals:
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh(preserve_all_data_layers=True, depsgraph=depsgraph)
        mesh.calc_loop_triangles()
        assert mesh.uv_layers.active, 'Retain original petal UVs'
        normals = obj.matrix_world.to_3x3().inverted().transposed()
        positions, normal, uv = [], [], []
        for tri in mesh.loop_triangles:
            for loop_index in tri.loops:
                vi = mesh.loops[loop_index].vertex_index
                positions.extend(obj.matrix_world @ mesh.vertices[vi].co)
                normal.extend((normals @ mesh.corner_normals[loop_index].vector).normalized())
                coord = mesh.uv_layers.active.data[loop_index].uv
                # Blender UVs start at the bottom; glTF textures start at the top.
                uv.extend((coord.x, 1.0 - coord.y))
        parts.append(dict(name=obj.name, positions=positions, normals=normal, uv=uv))
        evaluated.to_mesh_clear()
    variants[quality] = parts
high = [p['positions'] for p in variants['high']]
bounds = [[min(min(v[a::3]) for v in high) for a in range(3)],
          [max(max(v[a::3]) for v in high) for a in range(3)]]
origin = [(bounds[0][a] + bounds[1][a]) / 2 for a in range(3)]
height = bounds[1][1] - bounds[0][1]
for parts in variants.values():
    for part in parts:
        part['positions'] = [(v - origin[i % 3]) / height for i, v in enumerate(part['positions'])]
result = dict(source=source.name, blender=bpy.app.version_string, normalisation=dict(origin=origin, height=height), variants=variants)
(out / 'flower-meshes.json').write_text(json.dumps(result, separators=(',', ':')))
print(json.dumps(dict(blender=bpy.app.version_string, normalisation=result['normalisation'], triangles={k:sum(len(p['positions']) // 9 for p in v) for k,v in variants.items()}), indent=2))
