yarn build
ssh df "
  rm -rf /var/www/mining-dd-finance-test
  exit
"
scp -r build df:/var/www/mining-dd-finance-test
