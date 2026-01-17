
set -o errexit

pip install -r ./requirements.txt

python ./core/manage.py migrate
