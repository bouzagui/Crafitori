sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nginx 
sudo apt install gunicorn

# im using certbot for HTTPS/SSL, you can comment these lines if you prefer using a different service or your domain includes HTPPS by default
# you can run the following command to get a certificate for your domain after installing the packages
# sudo certbot --nginx -d domainname.com -d www.domainname.com
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# venv
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt

# Nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Setup Nginx
sudo cp nginx_cnf /etc/nginx/sites-available/crafitori
sudo ln -s /etc/nginx/sites-available/crafitori /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default config
sudo systemctl restart nginx

