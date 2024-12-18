# devTinder

## user
- POST /signUp
- POST /login
- POST /logout

## profile
- GET /profile/view
- POST /profile/update
- POST /profile/change-password

## connectionRequestRouter
- POST /send/request/interested/:id
- POST /send/request/ignored/:id  
- POST /receive/request/accepted/:requestid
- POST /receive/request/rejected/:requestid

## user
- GET /user/feed
- GET /user/requests
- GET /user/connections - Gets you profile of other users on the platform

status  - ignored,interested , accepted,rejected
