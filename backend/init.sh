sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nginx
sudo apt install -y curl software-properties-common ca-certificates lsb-release
sudo apt install gunicorn


#Nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs