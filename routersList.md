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
<!-- - POST /send/request/interested/:id
- POST /send/request/ignored/:id   -->
- POST /send/request/:status/:id  

<!-- - POST /receive/request/accepted/:requestid
- POST /receive/request/rejected/:requestid -->
- POST /receive/request/:status/:requestid

## user
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

status  - ignored,interested , accepted,rejected
