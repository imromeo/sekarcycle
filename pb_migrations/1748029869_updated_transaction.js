/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select1542800728",
    "maxSelect": 1,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "kg",
      "g",
      "liter",
      "buah/lembar"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // remove field
  collection.fields.removeById("select1542800728")

  return app.save(collection)
})
