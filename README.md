## StockTickr

This project was bootstrapped this project with [Create React App](https://github.com/facebook/create-react-app) and [Ant Design](https://ant.design)

I have a keen interest for investing and have been wanting to showcase some of my fullstack experience with a React web app. The app's purpose is to be able to show live business news, market performance, and individual stock performance to help make better investment decisions.

The reason I chose to use React for this web application is for the capability of consistently updating with realtime data. Unfortunately the free apis I implemented don't quite adhere to the demand, and often temporarily disable me from making further requests. Regardless using the React framework enabled me to create an extremely smooth feel for the changing components. And if I were to upgrade the API plan I would be able to easily add the realtime data capability.

## Mantra

Do as much server processing as possible, and use the least amount of gets to the api providers. 

## In Action
![Demo](readme_images/demo.gif?raw=true)
 
## Tech Stack

* React
* ANTD
* ReCharts.js
* Node.js
* Express
* Stock & News API

## Frontend Functionality
![Front end design](readme_images/components.png?raw=true)

Made sure to follow React’s one-way data flow concept.

## Backend Functionality
![backend flow](readme_images/backend_flow.png?raw=true)
\
![routes](readme_images/routes.png?raw=true)


## Notable Node modules Used
* [apicache](https://www.npmjs.com/package/apicache) - long and short term caching for both faster gets and less stress on the api server.
* [node-fetch](https://www.npmjs.com/package/node-fetch) - proxying api calls
* [cors](https://www.npmjs.com/package/cors) - to enable cross domain domain requests (react and express)

## Insallation & Usage

1. Clone repo
2. cd react-stock-web-app 
3. npm install
4. get free api keys from [AlphaVantage](https://www.alphavantage.co) and [NewsAPI](https://newsapi.org)
5. Place keys into server/config/config.json with the following format: 
   ````
   {
    "alphaVantageKey" : "******************",
    "newsAPIkey":"***************************************"
   }
   ````
  6. npm run dev

## Todo
* Compare current viewed grpah with popular market indexes 

## Current Issues

Due to the apis being free there is a very very limited amount of requests that I can make. In order to best accomodate for this I implement the apicache, but regardless the server will often not give me any data and an error is thrown by the program.

As much as I want to host the application I don't think it'd properly debut my product, since the api calls commonly get rejected. 

Alphavantage does not provide popular market indexes (e.g. SPY, Nasdaq DOW J, etc) so I used the area for sector performance. Would be awesome to have market indexes instead.
