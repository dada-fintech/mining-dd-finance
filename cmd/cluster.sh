yarn build
ssh df "
  rm -rf /var/www/dd-finance-cluster
  exit
"
scp -r build df:/var/www/dd-finance-cluster
