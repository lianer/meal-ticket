export NODE_ENV="production"
export PORT=4004
cd ./www
pm2 start ./bin/www --name ticket-api