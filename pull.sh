export NODE_ENV="production"
export PORT=4004
git pull origin master
cnpm i
cd ./app
cnpm i
cd ../www
cnpm i
pm2 restart ticket-api