![ERD diagram picture](ERD.png)

```
Table users {
  id uuid [pk]
  email string 
  password string 
  is_admin boolean
}

Table locations {
  id integer [pk]
  city string
  address string
  description text
}

Table photo_zones {
  id integer [pk]
  name string,
  picture string,
  style string
  description text
  price_per_hour integer 
  location_id integer [ref: > locations.id]
}

Table reservations {
  id integer [pk]
  start_time date
  duration_hours integer
  total_price integer
  photo_zone_id integer [ref: > photo_zones.id]
  user_id uuid [ref: > users.id]
}
```