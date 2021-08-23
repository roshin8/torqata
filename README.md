# Torqata


### Run  the Development Server
```bash
npm run start
```
To debug the app properly, install Browser Extensions - Redux DevTools and React Developer Tools 
  
Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.


##  Directory Stucture


```
torqata
├── public/          #static files
│   ├── assets/      #assets
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/  
│   ├── containers/  #container source
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── _nav.js      #sidebar config
│   ├── routes.js    #routes config
│   └── store.js     #app store
│
└── package.json
```


## Features
This app is built using React + Redux
- Data Source used - https://www.kaggle.com/shivamb/netflix-shows/data
- Database used Firestore
- CI/CD set up using Cloud Build (Trigger on changes to branch)
- Authentication implemented so that only authenticated users are capable of accessing the dashboard.
- Deployed on App Engine (GCP)
- Table of data with Filter, sorting, and pagination. Full text search implemented using Algolia
- Basic graphs 

