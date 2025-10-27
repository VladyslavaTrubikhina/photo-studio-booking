# Functional design

## Application overview

This is a photo studio reservation system. It allows users to browse photo zones, make reservations, and manage their accounts. Admins have extra rights like adding/updating/deleting new photo zones and viewing all reservations and users.

## User roles

- **User:** Can register a new account or log in with an existing one. Can see and search all existing photo zones without logging in. When logged it they can also add a reservation for themselves and view/cancel their reservations. Users can also change their email and password.


- **Admin:** Can log in with an existing account. Can see and search all existing photo zones without logging in. When logged it they can also add new photo zone, delete or update an existing one. Admins can also see all reservations and search them, same as with users.


## Main features and functionality

### Authentication

> - Users can log in with email and password.
> - Admins are flagged separately for special permissions.

### Users

> - Admins can see and manage all users.
> - Admins can search users by their id or email
> - Users can be created (registered), updated, and deleted.
> - Each user can have multiple reservations.

### Photo zones

> - Photo zone represents individual photo studio or themed room.
> - Stores details like name, picture, style, description, price per hour, and location.
> - Admins can create, update, and delete photo zones.
> - Admins and users can search zones by their name, description or location
> - Users can view all present photo zones with their details.
> - Users can check which zones are available at a specific date/time.

### Reservations

> - Users can make reservations for a specific photo zone, date, and time.
> - Reservation stores duration, total price, and links to the user and photo zone.
> - Admins can see all reservations, while users only see their own.
> - Admins can search reservations by their id, name or user email
> - Admins cannot make reservations themselves.