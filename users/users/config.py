import os

ENVIRONMENT = os.environ.get('ENVIRONMENT', 'local')
if ENVIRONMENT not in ['local', 'production']: 
    raise ValueError('ENVIRONMENT must be one of either local or production')

#FIREBASE_CREDENTIALS_FILE
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIREBASE_CRED_FILE = os.path.join(ROOT_DIR, 'firebase-credentials.json')

#DATABASE 
MONGO_USERNAME = os.environ.get("MONGO_USERNAME")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")
MONGO_HOST = os.environ.get("MONGO_HOST")
MONGO_PORT = os.environ.get("MONGO_PORT")
MONGO_DB = os.environ.get("MONGO_DB")
MONGO_PROTOCOL = os.environ.get("MONGO_PROTOCOL")
REPLICA_SET = os.environ.get("REPLICA_SET")
FIREBASE_PROJECT_ID=os.environ.get("FIREBASE_PROJECT_ID")
FIREBASE_WEB_API_KEY=os.environ.get("FIREBASE_WEB_API_KEY")


if ENVIRONMENT == 'production':  #     # create the tls connection -- file needs to be in config_files path
    TLS_CA_FILE_PATH = os.path.join(CONFIG_FILES_ROOT_PATH, os.environ.get("TLS_CA_FILE_PATH"))
    MONGO_URL= f"{MONGO_PROTOCOL}://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOST}"
else: 
    MONGO_URL = f"{MONGO_PROTOCOL}://{MONGO_HOST}:{MONGO_PORT}"
