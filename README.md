# README
* Deployed on: https://cvwo-task-manager.herokuapp.com/

* Versions used

Rails 6.0.3.4
ruby 2.7.2p137 (2020-10-01 revision 5445e04352) [x64-mingw32]
npm 6.14.9

* External libs

npm :

create-react-app
react-router-dom
react-bootstrap
babel-loader

rails :
cross-env (for windows only)
sqlite3 (testing)
pg (deployment)

* System dependencies

Tested:
Chrome Version 87.0.4280.88 (Official Build) (64-bit)
Firefox 84.0 (64-bit)


* Configuration
Remove cross-env from Procfile.dev if on linux.
Use db:seed to initialize default categories and tasks
