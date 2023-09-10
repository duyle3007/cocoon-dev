#!/bin/bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./nginx/certs/ccp.test.key -out ./nginx/certs/ccp.test.crt -subj "/C=VN/ST=HCM/L=Ho Chi Minh/O=BKODE/OU=IT Department/CN=*.ccp.test" 
openssl dhparam -out ./nginx/ssl/dhparam.pem 4096
