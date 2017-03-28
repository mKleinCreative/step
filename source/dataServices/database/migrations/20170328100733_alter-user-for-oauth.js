
exports.up = knex =>
  knex.schema.table('users', table =>
    table.renameColumn( 'password', 'oauthID' ) )


exports.down = knex =>
  knex.schema.table('users', table =>
    table.renameColumn( 'oauthID', 'password' ) )
