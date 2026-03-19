# 🚀 Full Stack Application Deploy (React + Flask) on EC2

This document describes, step by step, the complete deployment process of a full stack application, composed of:

Backend: Python + Flask + Gunicorn
Frontend: React (Vite)
Infrastructure: AWS EC2 (Ubuntu)
Web Server / Proxy: Nginx
Process management: systemd

The goal is to achieve a real-world production architecture, focusing on security, stability, and maintainability.

## 🏗️ Final Architecture
```bash
   Internet
  ↓ 80 (HTTP)
Nginx
  ├── /        → React Frontend (static files)
  └── /api/*   → Gunicorn → Flask
```

Gunicorn is not exposed publicly
Nginx is the single entry point
The frontend consumes the API through /api

## 1️⃣ EC2 Instance Creation

1. Create an EC2 instance with:
  AMI: Ubuntu Server 22.04+
  Instance type: t2.micro (free tier)
  Key pair: SSH
2. Security Group rules:
  Port 22 (SSH)
  Port 80 (HTTP)

❌ Do NOT open port 5000

Connect via SSH:
```bash
ssh -i YOUR_SSH_PEM_FILE.pem ubuntu@YOUR_PUBLIC_IP
```

## 2️⃣ System Preparation
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-venv python3-pip nginx git -y
```

## 3️⃣ Backend Deployment (Flask)
Project structure:
```bash
/home/ubuntu/apps/backend/python-portfolio-backend
 ├── main.py
 ├── requirements.txt
 ├── .env
 └── venv/
```
Create virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
deactivate
```
Initial local test
```bash
python main.py
curl http://localhost:5000/api/projects
```

```bash
C
```
```bash
O
```
```bash
N
```
```bash
T
```
