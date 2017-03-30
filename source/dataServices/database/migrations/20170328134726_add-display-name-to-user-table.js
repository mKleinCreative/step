exports.up = knex =>
  knex.schema.table('users', table => {
    table.varchar( 'displayName' )
  })
exports.down = knex =>
knex.schema.table('users', table => {
  table.dropColumn( 'displayName' )
})
