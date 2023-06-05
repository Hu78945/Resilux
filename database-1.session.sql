update listings
SET title = "Hello world",
    `description` = "This is it",
    price_per_night = 78.85,
    is_available = true,
    `Address` = "22S3",
    no_of_guests = 5,
    no_of_beds = 5,
    no_of_bedrooms = 2,
    no_of_bathrooms = 5,
    host_id = 26
WHERE listings.listing_id = 6