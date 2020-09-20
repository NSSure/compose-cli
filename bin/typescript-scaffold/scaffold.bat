echo [COMMAND]: 'npm init --force --yes --silent'
call npm init --force --yes --silent

echo [COMMAND]: 'npm install --save-dev typescript ts-loader webpack webpack-cli webpack-dev-server'
call npm install --save-dev typescript ts-loader webpack webpack-cli webpack-dev-server

echo [COMMAND]: 'tsc --init'
call tsc --init

echo [COMMAND]: 'mkdir src dist'
mkdir src dist