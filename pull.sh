export NODE_ENV="production"
export PORT=4004
git pull
npm i
cd ./app
npm i
cd ../www
npm i
pm2 restart ticket-api