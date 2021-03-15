sudo yarn build
ssh df "
  sudo rm -rf /var/www/mining-test-dd-finance
  exit
"
scp -r build df:/var/www/mining-test-dd-finance
