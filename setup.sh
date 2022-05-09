echo Let\'s initiate installation process...
read -p "Enter Databse Name : " dbname
read -p "Enter Databse Host : " hostname
read -p "Enter Database PORT : " portno
read -p "Enter Secret Key : " secretkey
read -p "Enter Expiry Time : " expirytime
read -p "Enter Project Port : " projectport

echo "module.exports = {"  >> 'env.js'
echo "	DATABASE : '$dbname',"  >> 'env.js'
echo "	DB_HOST : '$hostname',"  >> 'env.js'
echo "	DB_PORT : '$portno',"  >> 'env.js'
echo "	SECRET_JWT_KEY : '$secretkey',"  >> 'env.js'
echo "	TOKEN_EXPIRATION_TIME : '$expirytime',"  >> 'env.js'
echo "	PROJECT_PORT : '$projectport'"  >> 'env.js'
echo "};"  >> 'env.js'
echo "Setup is completed..!"