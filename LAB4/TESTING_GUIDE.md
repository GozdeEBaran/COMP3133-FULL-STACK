# Lab3 Restaurant API - Testing Guide

## 📦 Import Postman Collection

1. Open Postman
2. Click **Import** button (top left)
3. Select the file: `Lab3-Restaurant-API.postman_collection.json`
4. The collection will appear in your Collections sidebar

---

## 🧪 Testing Workflow

### Step 1: Start the Server

```bash
cd LAB4
npm start
```

Make sure you see:

```
✅ Connected to MongoDB successfully!
```

---

### Step 2: Create Sample Data

Run these POST requests in order to populate your database:

1. **Create Restaurant - Japanese**
2. **Create Restaurant - Bakery**
3. **Create Restaurant - Italian**
4. **Create Restaurant - Delicatessen (Manhattan)**
5. **Create Restaurant - Delicatessen (Brooklyn)**

---

### Step 3: Test Lab Requirements

Now test each lab requirement:

#### ✅ Requirement #4: Get All Restaurants

**Request:** `GET http://localhost:3000/restaurants`

- Should return ALL restaurants with ALL columns

#### ✅ Requirement #5: Get Restaurants by Cuisine

**Requests:**

- `GET http://localhost:3000/restaurants/cuisine/Japanese`
- `GET http://localhost:3000/restaurants/cuisine/Bakery`
- `GET http://localhost:3000/restaurants/cuisine/Italian`

Each should return only restaurants matching that cuisine.

#### ✅ Requirement #6: Get Restaurants with Sorting

**Requests:**

- `GET http://localhost:3000/restaurants?sortBy=ASC`
- `GET http://localhost:3000/restaurants?sortBy=DESC`

Should return selected columns (`_id`, `cuisines`, `name`, `city`, `restaurant_id`) sorted by `restaurant_id`.

#### ✅ Requirement #7: Get Delicatessen (Excluding Brooklyn)

**Request:** `GET http://localhost:3000/restaurants/Delicatessen`

**Expected Result:**

- ✅ Shows "Manhattan Delicatessen"
- ❌ Does NOT show "Brooklyn Delicatessen"
- Returns: `cuisines`, `name`, `city` (no `_id`)
- Sorted by `name` in ascending order

---

## 🔄 Update & Delete Testing

### Update Restaurant

1. Run `GET /restaurants` to get a restaurant `_id`
2. Copy the `_id` (e.g., `507f1f77bcf86cd799439011`)
3. In "Update Restaurant by ID" request:
   - Replace `REPLACE_WITH_ACTUAL_ID` in URL with the copied `_id`
   - Modify the JSON body as needed
   - Send PATCH request

### Delete Restaurant

1. Run `GET /restaurants` to get a restaurant `_id`
2. Copy the `_id`
3. In "Delete Restaurant by ID" request:
   - Replace `REPLACE_WITH_ACTUAL_ID` in URL with the copied `_id`
   - Send DELETE request

---

## 📊 Expected Results Summary

| Endpoint                        | Method | Returns                                      |
| ------------------------------- | ------ | -------------------------------------------- |
| `/`                             | GET    | API welcome message                          |
| `/restaurants`                  | GET    | All restaurants, all columns                 |
| `/restaurants/cuisine/:cuisine` | GET    | Restaurants matching cuisine, all columns    |
| `/restaurants?sortBy=ASC/DESC`  | GET    | Selected columns, sorted by restaurant_id    |
| `/restaurants/Delicatessen`     | GET    | Delicatessen NOT in Brooklyn, sorted by name |
| `/restaurant`                   | POST   | Create new restaurant                        |
| `/restaurant/:id`               | PATCH  | Update restaurant                            |
| `/restaurant/:id`               | DELETE | Delete restaurant                            |

---

## 🎯 Tips

- Use Postman's **Collections Runner** to run all GET requests sequentially
- Save responses to verify data structure
- Use **Environment Variables** in Postman to store `{{base_url}}` = `http://localhost:3000`
- Check MongoDB Atlas database to see data persisted

---

## 📝 Lab Submission Checklist

- [ ] All 7 lab requirements implemented and tested
- [ ] GitHub repository created and code committed
- [ ] Postman collection tested and saved
- [ ] Screenshots of successful API responses
- [ ] README.md with setup instructions
