/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2h3i4j5k6l7m8n9",
    "created": "2024-03-09 12:00:01.000Z",
    "updated": "2024-03-09 12:00:01.000Z",
    "name": "pipeline_stages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pipeline_id_field",
        "name": "pipeline_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "1g2h3i4j5k6l7m8",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "title_field",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "position_field",
        "name": "position",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_pipeline_stages_pipeline_id` ON `pipeline_stages` (`pipeline_id`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return new Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2h3i4j5k6l7m8n9");

  return dao.deleteCollection(collection);
});
