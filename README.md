# ![Ecomstore ]

----------

# Getting started

## Installation

Backend:

To setup your backend fill the config.example.php script with your database connection credentials and rename to config.php

  mv config.example.php config.php

Run migrations

  php run_migrations.php

test on your browser by starting webserver

  php -S localhost:<port>

Frontend:

set up by navigation to the frontend folder and installing dependecies

  cd frontend && npm install

Make sure to fill the baseURL property in config with backend url in 'frontend/src/config/config.ts'

bundle your javascript by running 

  npm run build

