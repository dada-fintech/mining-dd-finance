yarn build
ssh df "
  rm -rf /var/www/mining-dd-finance
  exit
"
scp -r build df:/var/www/mining-dd-finance
