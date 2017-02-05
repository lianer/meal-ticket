git pull origin master
npm i

# build app
cd ./app
npm i
npm run build
rsync -a --delete dist/ dist-prod/
cd ..

# reload server
cd www
npm i
export NODE_ENV="production"
export PORT=4004
pm2 reload ticket-api
cd ..
