# Residences — provenance

Every picture in this folder is a **stock photograph from Unsplash** of a building's exterior,
downloaded once on 2026-08-22 through `unsplash.com/photos/<id>/download?w=1600`, centre-cropped to
3:2 and resized to 1200×800 WebP, quality 78. They are published under the
[Unsplash License](https://unsplash.com/license): free to use for commercial and non-commercial
purposes, no permission needed, attribution appreciated — so each one is credited below. None shows
a building that belongs to Aster or Audentra; the hall names in the data are fictional and were
assigned to the pictures, not the other way round.

## What a residence picture may show, and how one is chosen

In the product these are **what Residential Life published for the hall** (the housing review of
2026-08-21, rule 4 and G1): the portal only shows them. A picture shows **the residence** — its
exterior, a shared space, a floor diagram — never a specific room. Where a bedroom is ever shown,
the caption names the room type it belongs to, because a student who sees a furnished single and is
assigned a shared double reads the picture as a promise that was broken. A hall with no picture on
file gets the monogram, and the fallback is never stock photography and never a generated image.

The stand-ins here are chosen by hand to read as a **US campus**: brick and stone halls, quads and
lawns, a courtyard block, the plaza of a newer building. Each is matched to the hall's own copy
(Alcott has a bike store, so its picture has the racks; Dunmore is flats around a courtyard; Kestrel
is step-free, so its entrance is the level one off a plaza). No people are the subject of any of
them. Captions in `src/features/housing/data.js` say what the picture shows and nothing the
picture does not.

To replace one: pick an exterior on Unsplash with the hall's copy in mind, fetch
`https://unsplash.com/photos/<id>/download?w=1600`, crop to 3:2, resize to 1200×800, keep the file
name — the record points at the name. Record the id and the photographer here, and rewrite the
caption if the picture shows something else.

| File | Hall | What it shows | Unsplash id | Image id | Photographer |
| --- | --- | --- | --- | --- | --- |
| alcott.webp | Alcott House | the bike racks by the east door, ivy on brick | cXUOQWdRV4I | photo-1527891751199-7225231a68dd | Ryan Jacobson |
| brackenridge.webp | Brackenridge Hall | a mid-century brick hall across a lawn | U0dBV_QeiYk | photo-1562774053-701939374585 | Michael Marsh |
| coyne.webp | Coyne House | a new brick-and-glass hall from the lawn | gnj9vj--FRY | photo-1607237138185-eedd9c632b0b | Porter Raab |
| dunmore.webp | Dunmore Court | a courtyard block of flats | GrLnSHJT1fI | photo-1596276020587-8044fe049813 | Nick Kimel |
| elmsworth.webp | Elmsworth Hall | a red-brick hall among trees, in spring | IVNO5SmlY5o | photo-1745817612368-c40ccac7c391 | Brett Wharton |
| fairholt.webp | Fairholt House | a brick hall across a lawn, in the fall | r55kulBKAjM | photo-1605299670824-00515e81b924 | Steven Cordes |
| garrow.webp | Garrow Court | a small house's front door | K5xIiSp3Hw0 | photo-1713835877824-52869fe2a5a2 | Austin |
| kestrel.webp | Kestrel House | a modern brick building's entrance from a plaza | Ucr4Yp-t364 | photo-1592280771190-3e2e4d571952 | Porter Raab |

The Unsplash id resolves to the photo page (`unsplash.com/photos/<id>`); the image id is the CDN's.
