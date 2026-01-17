
set -o errexit

pip install -r backend/requirements.txt

python manage.py migrate
