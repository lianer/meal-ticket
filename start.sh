git pull origin master
npm i

# build app
cd ./app
npm i
npm run build
rsync -a --delete dist/ dist-prod/
cd ..

# run server
cd ./www
npm i
export NODE_ENV="production"
export PORT=4004
pm2 start ./bin/www --name ticket-api -i 2
cd ..
