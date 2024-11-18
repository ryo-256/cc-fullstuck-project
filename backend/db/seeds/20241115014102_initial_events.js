/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("events").del();
  await knex("events").insert([
    {
      id: 1,
      event_schemas_id: 1,
      eventData_json: JSON.stringify({
        keyword: "コメントのためのコメントをしない",
        reason: "新しい発見があったから",
        comment: "優れたコメントよりも明確な名前のほうが大切なんだなぁ",
      }),
    },
  ]);
  await knex.raw(
    "select setval(pg_get_serial_sequence('events', 'id'), MAX(id)) FROM events"
  );
};
