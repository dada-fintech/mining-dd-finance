yarn build
ssh df "
  sudo rm -rf /var/www/mining-test-dd-finance
  exit
"
chmod -R 775 ./build
scp -r build df:/var/www/mining-test-dd-finance
