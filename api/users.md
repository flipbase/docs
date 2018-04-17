# Users

## List users
Returns a list of all users the authenticated user has access to.

    GET /api/users

## Get a specific user
Returns a specific user 

    ## GET /api/users/:id
    ## PUT /api/users/:id 

    ## GET /api/users
    ## POST /api/users

# Organizations

    ## POST     /api/organizations/:id/members
    ## PUT      /api/organizations/:id/members/:id
    ## DELETE   /api/organizations/:id/members/:id
    ## GET      /api/organizations/:id/members/:id



## List permissions with regards to an organization of the authenticated user
    #GET /api/organization/:id/permissions 

## Get the permission with regards to an user in relation to another user
  
    #GET /api/users/:id/permissions/users



- Moet je als account manager toegang hebben direct tot gebruikers? Of enkel tot de organisatie?
  -> Als je andere mensen wil uitnodigen voor een bepaalde organisatie, moet je een GET users request maken


-> create account by POST /api/users
  -> daarna krijg je als 'owner' van het user account ook CRUD perms en dus kan je ook PUT/DELETE/GET /api/users/:id doen
    -> en dus kan je perms aanpassen
