/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3245856272",
    "hidden": false,
    "id": "relation2168032777",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "customer",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2194024101")

  // remove field
  collection.fields.removeById("relation2168032777")

  return app.save(collection)
})
