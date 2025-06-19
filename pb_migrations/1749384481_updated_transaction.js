/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date1447295243",
    "max": "",
    "min": "",
    "name": "stored",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date1447295243",
    "max": "",
    "min": "",
    "name": "stored",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
