# COMP 3133 - Full Stack Development II

## Lab 03 - MongoDB & Mongoose - Restaurant Database

Create NodeJS + Express + MongoDB + Mongoose application to perform restaurant database operations.

---

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Atlas

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update your MongoDB Atlas credentials in `.env`:

```
DB_NAME=Lab3-restaurant_database
DB_USER_NAME=eskigozdee_db_user
DB_PASSWORD=Test12345Mongo
DB_CLUSTER_ID=03sjblv
```

### 3. Start the Server

```bash
npm start
```

Server runs on: **http://localhost:3000**

---

## API Endpoints

### 4. Get All Restaurants

**Select all columns**

```
GET http://localhost:3000/restaurants
```

---

### 5. Get Restaurants by Cuisine

**Select all columns**

```
GET http://localhost:3000/restaurants/cuisine/Japanese
GET http://localhost:3000/restaurants/cuisine/Bakery
GET http://localhost:3000/restaurants/cuisine/Italian
```

---

### 6. Get Restaurants with Sorting

**Selected columns must include:** `id`, `cuisines`, `name`, `city`, `restaurant_id`  
**Sorting by:** `restaurant_id` in Ascending or Descending order

```
GET http://localhost:3000/restaurants?sortBy=ASC
GET http://localhost:3000/restaurants?sortBy=DESC
```

---

### 7. Get Delicatessen Restaurants (Excluding Brooklyn)

**Criteria:**

- All cuisines are **equal** to `Delicatessen`
- City is **not equal** to `Brooklyn`

**Selected columns:** `cuisines`, `name`, `city` (exclude `id`)  
**Sorting:** Ascending order on `name`

```
GET http://localhost:3000/restaurants/Delicatessen
```

---

## Additional Endpoints (CRUD Operations)

### Create Restaurant

```
POST http://localhost:3000/restaurant
Content-Type: application/json

{
  "restaurant_id": "12345678",
  "name": "Sample Restaurant",
  "cuisines": "Japanese",
  "city": "Toronto",
  "borough": "Downtown",
  "address": {
    "building": "123",
    "street": "Main St",
    "zipcode": "M5V1A1"
  }
}
```

### Update Restaurant

```
PATCH http://localhost:3000/restaurant/:id
Content-Type: application/json

{
  "name": "Updated Restaurant Name",
  "cuisines": "Italian"
}
```

### Delete Restaurant

```
DELETE http://localhost:3000/restaurant/:id
```

---

## Testing with Postman

### Import the Postman Collection

1. Open Postman
2. Click **Import** button
3. Select `Lab3-Restaurant-API.postman_collection.json` from this folder
4. All endpoints will be imported automatically

### Testing Steps

1. Start the server: `npm start`
2. Create sample restaurants using POST requests
3. Test all 7 lab requirements using the collection
4. See `TESTING_GUIDE.md` for detailed instructions

---

## Notes

- **Lab04 and Lab05 (Week06)** work will be dependent on this lab03
- Create GitHub repository and commit all your code to GitHub
- Use Postman to test the results
