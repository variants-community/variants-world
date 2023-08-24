import { exec } from 'child_process'
import dotenv from 'dotenv'

dotenv.config()

const command = `npx supabase gen types typescript --project-id "${process.env.SUPABASE_PROJECT_ID}" --schema public > ./src/db/supabase/types.ts`

exec(command, (err) =>
  err
    ? console.error('could not execute command: ', err)
    : console.log('successfully')
)
