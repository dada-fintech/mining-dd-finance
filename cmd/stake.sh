yarn build
ssh df "
  rm -rf /var/www/dd-finance-stake
  exit
"
chmod -R 775 ./build
scp -r build df:/var/www/dd-finance-stake
