## Requirements

* Python 3.6
* virtualenv (needed for AWS Lambda deployment)

## (Development environment (local)

1. Move into lambda function directory
1. Create a local virtualenv: `virtualenv --python=python3.6 venv`
2. `source venv/bin/activate`
3. Check if it's correctly activated `which python` should output `REPO_PATH/fetcher/venv/bin/python`
4. `pip install -r requirements.txt`

If venv is available, just start from (3).

## Create

```
bash ./build_lambda_package.sh LAMBDA_DIR_NAME
```