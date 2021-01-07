yarn build
ssh df "
  rm -rf /var/www/mining-binance-dd-finance
  exit
"
scp -r build df:/var/www/mining-binance-dd-finance
