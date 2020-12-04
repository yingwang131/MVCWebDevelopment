# MVC Web Development
#### An interactive web application full stack project for users to search events, create new event, add|delete|update current event to the users account.
## Tech Stack
* Front end: HTML/CSS/JavaScript
* Back end: Nodejs
* Database: MongoDB
* Frameworks: MVC 


## Logic Layer
![image](https://github.com/yingwang131/MVCWebDevelopment/blob/master/MVCWebProject/FinalProjectApplication/DemoPic/logic.png)
## MVC
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/rpc.png)
## Database
### the schema for MySQL database of this project.
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/db.png)
## Recommendation Algorithm(content-based)
### I recommend events based on categories that the user has favorited. By knowing the category of the item the user favorited, I recommend some events belong to this category nearby this user.
* Fetch all ids of these events this user has visited.
* Given all these events, fetch the categories of these events.
* Given these categories, find what are the events that belong to them.
* Filter events that this user has visited.
* Sort the recommendation list on ascending order of distance between recommended events's locations and user's location.
## Login
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/login.png)
## Register
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/register.png)
## Search
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/search.png)
## Favourite
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/fav.png)
## Recommendation
![image](https://github.com/yingwang131/Event-Recommendation/blob/master/DemoPic/recom.png)
