# Technical design

## General overview and approach

### Purpose

This is a photo studio reservation system. It allows users to browse photo zones, make reservations, and manage their accounts. Admins have extra rights like adding/updating/deleting new photo zones and viewing all reservations an users.

### Approach

Technology stack:
> - Frontend: Svelte, Tailwind
> - Backend: Node.js + Express.js
> - Security: JWT, BCrypt
> - Database: SQLite (via Sequelize ORM)


## Dtatbase design

![ERD diagram picture](./resources/ERD.png)

This database is built for a photography studio booking system and has three main tables: `users`, `photo_zones`, and `reservations`.

**Relations**

Each user can have multiple reservations, which creates a one-to-many relationship between `users` and `reservations`. As well as each photo zone can have many reservations, so there is a one-to-many relationship between `photo_zones` and `reservations` too. This setup allows the system to know which photo zone is booked by which user, on what date, and at what time.

**Users**

The `users` table stores information about each user, including their unique ID, email, password, and whether they are an admin.

**Photo zones**

The `photo_zones` table holds details about the different photography locations. This includes the name, picture, style, description, hourly price, and location of each zone.

**Reservations**

The `reservations` table links users and photo zones. It records the reservation name, date, time, duration, and total price. Each reservation is connected to a user and a photo zone through foreign keys, ensuring data stays consistent. This design makes it easy to manage bookings, calculate total costs, and let admins or users see the reservations relevant to them.