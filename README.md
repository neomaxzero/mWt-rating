# mWt-rating

Simple Auth0 WebTask that persist average points in a mongodb instance

## Why would i use this?
Webtasks allow us to execute custom server side code from the frontend. This opportunity i did a simple service that saves the average point of a string (...a link/movie/music). It could be useful when you want to implement a star rating system for your blog/portfolio/(your thing).

## WebTask address
https://webtask.it.auth0.com/api/run/wt-maxicespedes7-hotmail_com-0/wt-rating?webtask_no_cache=1

## Input parameters
 * link: string
 * points: number

## Output 
It returns the average point of the link you want to qualify, if it doesn't exist, its created.
```
{
  "link":"ok",
  "avgPoints":"6",
  "quantity":1,
  "_id":"5729e96b75c67d01006ed43b"
}
```


## Saving one point
Running this
```
https://webtask.it.auth0.com/api/run/wt-maxicespedes7-hotmail_com-0/wt-rating?webtask_no_cache=1&link=https://auth0.com/&points=5
```
Returns
```
{
  "link":"https://auth0.com/",
  "avgPoints":"5",
  "quantity":1,
  "_id":"5729ead140d34b0100604590"
}
```
From now on, futurs points to this link will update the avgPoints.

### Listing every thing rated
Omiting the "link" parameter will give you the list of items rated.
```
https://webtask.it.auth0.com/api/run/wt-maxicespedes7-hotmail_com-0/wt-rating?webtask_no_cache=1&

[
  {"_id":"5724f8ebfca0fd7cf0f2cf71",
   "link":"www.google.com",
   "avgPoints":5,
   "quantity":1
  },
  {"_id":"5727ca25fca0fd639272fb71",
   "link":"facebook",
   "avgPoints":5,
   "quantity":1
  }
]
```



## Built With

* [Auth0 WebTask](http://www.webtask.io/)
* [MLab](https://mlab.com/)
* Vanilla JS
* Atom 
* Love 

## Authors

* **Céspedes Maximiliano** 

