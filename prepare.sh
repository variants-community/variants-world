git config core.hooksPath ./git-hooks

npm i
npx prisma generate

clear

echo 'user: dio      password: 1234567890'
echo 'user: jotaro   password: 1234567890'

npm start
