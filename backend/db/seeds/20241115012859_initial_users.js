/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([{ id: 1, name: "ryo", password: "password" }]);
  await knex.raw(
    "select setval(pg_get_serial_sequence('users', 'id'), MAX(id)) FROM users"
  );
};
