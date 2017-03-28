import { default as passportAuth } from 'passport'
import { default as GoogleStrategy } from 'passport-google-oauth2'
import { getUserByOAuthID } from '../dataServices/database/queries/utilities'
import { createRecord } from '../dataServices/database/commands/utilities'

//HACK: This is no bueno
const stratergerize = {
  GOOGLE_CONSUMER_KEY: "561778736592-pkk0fomt2mi29dkd5a9m0fcdtumu7fcu.apps.googleusercontent.com",
  CLIENT_SECRET: "ZK6QUW-OjNxvXwDIPVEK0ZQ6"
}

const StrategeryDood = new GoogleStrategy({
  clientID: stratergerize.GOOGLE_CONSUMER_KEY,
  clientSecret: stratergerize.CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:1337/google/auth/callback',
  passReqToCallback: true
},
  ( request, accessToken, refreshToken, profile, done ) => {
    getUserByOAuthID( profile.id )
    .then( user => {
      if ( user.length === 0 ) {
        const attributes = {
          oauthID: profile.id,
          email: profile.email,
          displayName: profile.name.givenName,
          created_at: new Date()
        }
        createRecord( 'users', attributes )
        .then( user => done( null, user ) )
      } else {
        console.log('profile!', user );
        done( null, user )
      }
    })
})

export default StrategeryDood
