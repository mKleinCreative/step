exports.up = knex =>
  knex.schema.table('users', table => {
    table.varchar( 'refreshToken' )
  })

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn( 'refreshToken' )
  })
