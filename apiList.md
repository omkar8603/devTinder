# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connnectionRequestRouter
- POST /request/send/intersted/:userId
- POST /request/ send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/connections
- GET /user/request/received
- GET /user/feed - Gets you prifile of other users on platform

Status: ignore, intersted, accepeted, rejected 