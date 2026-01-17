
set -o errexit

pip install -r backend/requirements.txt

python backend/core/manage.py migrate
