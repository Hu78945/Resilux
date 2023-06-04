# DataBase-Mangement-System-Project

## Entities and Attributes

1. **User**
- User ID (Primary key)
- First name
- Last name
- Email (Foreign key)
- Phone number
- Profile picture
- IsHost status (boolean: yes/no)
- Reviews (total number)
- Listing ID (foreign key to Listing entity)
- IsVerification  (e.g., email, phone number, government ID)

2. **Listing**
- Listing ID (Primary key)
- Title
- Description
- Number of guests
- Number of bedrooms
- Number of beds
- Number of bathrooms
- Price per night
- is_Available (boolean)
- Host ID (foreign key to User entity)
- Neighbourhood_ID (Foreign key)
- Address (Foreign key)
        
3. **Booking**
- Booking ID (Primary key)
- start date
- end date
- Number of guests
- Total price
- Listing ID (foreign key to Listing entity)
- Guest ID (foreign key to User entity)

4. **Review**
- Review ID (Primary key)
- Rating (out of 5)
- Comment
- Listing ID (foreign key to Listing entity)
- Guest ID (foreign key to User entity)
- Host ID (foreign key to User entity)

5. **Message**
- Message ID (Primary key)
- Sender ID (foreign key to User entity) (User ID)
- Receiver ID (foreign key to User entity) (User ID)
- Message content
- Timestamp

6. **Payment**
- Payment ID (Primary key)
- Amount
- Date
- Booking ID (foreign key to Booking entity)
- Payment_method (Foreign key from payment_Method)


7. **Wish List**
- Wish List ID (Primary key)
- User ID (foreign key to User entity)
- Listing ID (foreign key to Listing entity)

8. **Neighborhood**
- Neighborhood ID (Primary key)
- Neighborhood name
- Listings (foreign key to Listing entity)

9. **Notification**
- Notification ID (Primary key)
- User ID (foreign key to User entity)
- Message
- Timestamp

10. **Language**
- Language ID (Primary key)
- Language name
- Listing ID (foreign key to Listing entity)

11. **Payment Method**


- listing id (foreign key) 
- Payment Method Id
above both are the composite primary key
- userid (foreign key)
- credit_card
- Debit_card
- Cash_on_hand

12. **House Rules**


- House_rules_id (Primary key)
- listing_id (foreign key)
above both are the composite primary key
- Smoking (bool)
- Pets (bool)
- NoshoesInside (bool)
- party / Events (bool)
- Visitors (bool)

13. **Type Of Properties**

- type_of_properties_id int primary key auto_incremen
- listings_id (foreign key)
above both are the composite primary key
- apartment boolean
- villa boolean
- house boolean
- cabin boolean
- cottage boolean
- loft boolean
- town_house boolean

14. **Amenities**

- amenties_id int primary key auto_increment
- listings_id (Foreign key)
above both are the composite primary key
- wifi boolean
- kitchen boolean
- pool boolean
- AC boolean
- TV boolean
- washer boolean
- parking boolean
- gym boolean
- Outdoor_spaces boolean
- safety_features boolean
- essentials boolean

15. **Credentials**

- Email (Primary key) varchar(100)
- password varchar(100)

16. **City**

- Neighbourhood_ID (Foreign key)
- City
Above both are the composite keys


17. **Country**

- Neighbourhood_ID (Foreign key)
- Country
Above both are the composite keys


18. **State**

- Neighbourhood_ID (Foreign key)
- State
Above both are the composite keys

19. **Location**

- address (primary key)
- Postal code

## ER Diagram
```
         +-----------------+        +------------------+         
         |       User      |        |     Listing      |         
         +-----------------+        +------------------+         
         |  User_ID (PK)   |        |  Listing_ID (PK) |         
         |  First_Name     |        |  Title           |         
         |  Last_Name      |        |  Description     |         
         |  Email_Address  |        |  Property_Type   |         
         |  Password       |        |  Guests          |         
         |  Phone_Number   |        |  Bedrooms        |         
         |  Profile_Pic    |        |  Beds            |         
         |  Verification   |        |  Bathrooms       |         
         |  Payment_Info   |        |  Price_Per_Night |         
         |  Host_Status    |        |  Location        |         
         |  Superhost      |        |  Address         |         
         |  Reviews        |        |  Amenities       |         
         |  Listings (FK)  |        |  House_Rules     |         
         +-----------------+        |  Calendar        |         
               |     |              |  Host_ID (FK)    |         
               |     +--------------+------------------+
               |                                         |
               |                                         |
+------------------+                            +----------------+
|    Booking       |                            |    Review      |
+------------------+                            +----------------+
|   Booking_ID (PK)|                            |   Review_ID(PK)|
|   Check_In_Date  |                            |   Rating       |
|   Check_Out_Date |                            |   Comment      |
|   Guests         |                            |   Listing_ID(FK)|
|   Total_Cost     |                            |   Guest_ID(FK) |
|   Listing_ID(FK) |                            |   Host_ID(FK)  |
|   Guest_ID(FK)   |                                       |
|                  |                                       |
+------------------+                                       |
            |                                               |
            |                                               |
+-----------------+                                 +-----------------+
|    Message      |                                 |    Payment      |
+-----------------+                                 +-----------------+
|   Message_ID(PK)|                                 |   Payment_ID(PK)|
|   Sender_ID(FK) |                                 |   Amount        |
|   Receiver_ID(FK)|                                 |   Date          |
|   Message       |                                 |   Payment_Method|
|   Timestamp     |                                 |   Booking_ID(FK)|
+-----------------+                                 +-----------------+
          |                                                       
          |                                                       
+-----------------+                                                        
|    Wish List    |                                                     
+-----------------+                                                        
|  Wish_List_ID(PK)|                                                       
|  User_ID (FK)    |                                                       
|  Listing_ID(FK)  |                                                       
+-----------------+                                                     

+-----------------+
|   Neighborhood  |
+-----------------+
|  Neighborhood_ID|
|  Neighborhood   |
|  City           |
|  State          |
|  Country        |
|  Listings (FK)  |
+-----------------+

+-----------------+
|  Notification   |
+-----------------+
|  Notification_ID|
|  User_ID (FK)   |
|  Notification   |
|  Timestamp      |
+-----------------+

+-----------------+
|     Language    |
+-----------------+
|   Language_ID   |
|   Language_name |
|   Listings (FK) |
+-----------------+

```

**Store procedure**

- Log-in (email, password)
- Register (All attribute except password)
- update a user
- delete a user(use credential to delete a user)
- create a listings
        - specify house rules
        - specify amenities
        - specify type of property
        - specify neighbourhood
- update a listing 
        - generate a notification 
- delete a listing
- create a booking
        - create a payment
        - cancel a payment
        - choose a payment method
- update a booking 
        - generate a notification 
- delete a booking
- post a review on particular listing
- post a review on particular user
- delete a review on particular listing
- delete a review on particular user
- create a message
- delete a message
- add a language


**Function**

- Check if user exists
- create a function to index listing name

**Views**

- get a user with particular email
- get a listings with particular user email
- get a listings with particular neighbourhood id
- filters for listing(city, country, state, price range, number of bedrooms)
- get a bookings with particular user id
- get a bookings with particular neighbourhood id
- get a particular review of a listing 
- get a particular review of a user
- view a message with particular user
- view history of all the payments of that user
- select a language

**Triggers**

- create a trigger when user is created for displaying it
- crate a trigger when listings is created for displaying it
- crate a trigger when booking is created for displaying it
- create a trigger when user is updated for displaying it
- create a trigger when listings is updated for displaying it
- create a trigger when booking is updated for displaying it 

##Contributions in this project

## Abdulrehman part:

**Store Procedure**

- create a listings 1
        - specify house rules
        - specify amenities
        - specify type of property
        - specify neighbourhood

- create a booking
        - create a payment
        - cancel a payment
        - choose a payment method
- update a booking 
        - generate a notification 
- delete a booking
- create a message
- delete a message

**Views**

- get a listings with particular user email
- get a listings with particular neighbourhood id
- filters for listing(city, country, state, price range, number of bedrooms)
- get a particular review of a listing 
- get a particular review of a user
- view a message with particular user

**Triggers**

- create a trigger when user is created for displaying it
- create a trigger when user is updated for displaying it
        
## Behzad part:

**Store Procedure**

- create a listings 2
        - specify house rules
        - specify amenities
        - specify type of property
        - specify neighbourhood

- update a listing 
        - generate a notification 
- delete a listing
- post a review on particular listing
- post a review on particular user
- delete a review on particular listing
- delete a review on particular user


**Views**

- get a listings with particular user email
- get a listings with particular neighbourhood id
- filters for listing(city, country, state, price range, number of bedrooms)
- get a user with particular email
- view history of all the payments of that user
- select a language

**Triggers**

- crate a trigger when listings is created for displaying it
- create a trigger when listings is updated for displaying it

## Yahya part:

**Store Procedure**
- create a listings 3
        - specify house rules
        - specify amenities
        - specify type of property
        - specify neighbourhood

- Log-in (email, password)
- Register (All attribute except password)
- update a user
- delete a user(use credential to delete a user)
- add a language

**Views**

- get a listings with particular user email
- get a listings with particular neighbourhood id
- filters for listing(city, country, state, price range, number of bedrooms)
- get a bookings with particular user id
- get a bookings with particular neighbourhood id

**Triggers**

- crate a trigger when booking is created for displaying it
- create a trigger when booking is updated for displaying it 

**Function**

- Check if user exists
- create a function to index listing name
