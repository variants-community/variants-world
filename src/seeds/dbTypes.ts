import { exec } from 'child_process'
import dotenv from 'dotenv'

dotenv.config()

const command = `npx supabase gen types typescript --project-id "${process.env.PROJECT_ID}" --schema public > ./src/db/supabase/types.ts`

exec(command, (err) => {
 if (err) {
     console.error('could not execute command: ', err)
     return
 }
 console.log('successfully')
})