yarn build
ssh df "
  rm -rf /var/www/mining-heco-dd-finance
  exit
"
scp -r build df:/var/www/mining-heco-dd-finance
