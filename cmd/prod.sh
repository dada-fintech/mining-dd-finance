yarn build
ssh df "
  rm -rf /var/www/mining-dd-finance
  exit
"
scp -r build df:/var/www/mining-dd-finance
ssh df "
  chmod -R 777 /var/www/mining-dd-finance/img
  exit
"