/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("events").del();
  await knex("event_schemas").del();
  await knex("event_schemas").insert([
    {
      id: 1,
      schema_json: JSON.stringify({
        items: [
          { name: "keyword", type: "string" },
          { name: "reason", type: "string" },
          { name: "comments", type: "string" },
        ],
      }),
    },
  ]);
};
