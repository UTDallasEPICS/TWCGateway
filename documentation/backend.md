# Modifications to the Database Schema

These new changes have been implemented to support device tracking functionality within the database. The schema includes three new tables: **Device**, **Location**, and **Checkout**.

## Device
Stores information about the individual devices, including serial number, name, department association, location, cost, and archive status.

### Fields:
- **Id** (int) → Primary key. Auto-incremented unique identifier for each device.
- **serialNumber** (string) → Unique serial number of the device.
- **name** (string) → Descriptive name of the device.
- **department** (department) → Foreign key relation to the department table. Tracks which department it belongs to.
- **departmentID** (int) → A foreign key field referencing the associated department record.
- **location** (location) → Foreign key relation to the location table. Tracks the current location of the device.
- **locationID** (int) → A foreign key field referencing the associated location record.
- **cost** (int) → Cost of the device. Default value is 0.
- **checkout** (checkout[]) → An array of relations to the checkout table. Tracks the checkout records associated with the device.
- **archived** (boolean) → Indicates if the device is archived or not. Default is `False`.

## Location
Represents the location where devices are stored.

### Fields:
- **Id** (int) → Primary Key. Auto-incremented unique identifier for each location.
- **locationName** (string) → The name of the location.
- **address** (string) → Physical address of the location.
- **devices** (devices[]) → An array relation to the devices table. Lists all the devices currently assigned to this location.
- **archived** (boolean) → Indicates if the location is archived. Default is `False`.

## Checkouts
Tracks when a device is checked out and by whom.

### Fields:
- **Id** (int) → Primary Key. Auto-incremented unique identifier for each checkout record.
- **user** (user?) → An optional foreign key relation to the User table. Tracks the user who checked out the device.
- **userID** (int) → The foreign Key referencing the associated user record.
- **device** (device) → A foreign key relation to the device model. Tracks which device was checked out.
- **deviceID** (int) → The foreign key field referencing the associated device record.
- **checkoutDate** (DateTime) → The timestamp of when the device was checked out.
- **archived** (boolean) → Indicates if the checkout record is archived. Default is `False`.

---

# API Endpoints for Device Tracking

## Authentication and Authorization:
- **Authorization Method**: Bearer Token (JWT)
- **Role Check**: The `isRoleAdmin` helper function verifies if a user has an admin role. Only users with admin roles can access these endpoints.

### Endpoints:

#### Get All Devices
- **Route**: `GET /getAllDevices`
- **Description**: Fetch all non-archived devices with their associated checkout, department, and location details.
- **Access**: Admin Only
- **Inputs**: Authorization header: Bearer Token
- **Outputs**: 
  - Success (200): JSON data containing `id`, `name`, `serialNumber`, `checkout`, `userId`, `user`, `checkoutDate`, `departmentName`, `locationName`.
  - No devices (200): `{"message": "No Device Found or All Devices Archived"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting all devices"}`

#### Get Device by ID
- **Route**: `GET /getDeviceID/:id`
- **Description**: Fetch a single non-archived device by its ID.
- **Access**: Admin Only
- **Inputs**: `id` (Device ID), Bearer Token
- **Outputs**:
  - Success (200): JSON data containing `id`, `name`, `serialNumber`.
  - No Device (200): `{"message": "No Device Found"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting device id"}`

#### Get Device by Serial Number
- **Route**: `GET /getDeviceSerial/:serialNumber`
- **Description**: Fetch a single non-archived device by its serial number.
- **Access**: Admin Only
- **Inputs**: `serialNumber`, Bearer Token
- **Outputs**:
  - Success (200): Device details in JSON format.
  - No Device (200): `{"message": "No Device Found"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting device serial number"}`

#### Create Device
- **Route**: `POST /createDevice`
- **Description**: Add a new device to the database.
- **Access**: Admin Only
- **Inputs**: `name`, `serialNumber`, `departmentID`, `locationID`, `cost`, Bearer Token
- **Outputs**:
  - Success (201): Newly created device details.
  - Validation Error (400): `{"message": "Missing required fields: name, serialNumber"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error creating device"}`

#### Add Location
- **Route**: `POST /addLocation`
- **Description**: Adds a new location to the database.
- **Access**: Admin Only
- **Inputs**: `locationName`, `address`, Bearer Token
- **Outputs**:
  - Success (201): Newly created location details.
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error creating location"}`

#### Get All Locations
- **Route**: `GET /getAllLocations`
- **Description**: Fetch all non-archived locations.
- **Access**: Admin Only
- **Inputs**: Bearer Token
- **Outputs**:
  - Success (200): List of locations.
  - No Locations (200): `{"message": "No Locations found or all locations archived"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error Getting all Locations"}`

#### Update Device
- **Route**: `PUT /updateDevice`
- **Description**: Update the name of a device.
- **Access**: Admin Only
- **Inputs**: `deviceId`, `newDeviceName`, Bearer Token
- **Outputs**:
  - Success (200): Updated device details.
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error updating device name"}`

#### Delete Device
- **Route**: `PUT /deleteDevice`
- **Description**: Archive a device and its associated checkouts.
- **Access**: Admin Only
- **Inputs**: `id`, Bearer Token
- **Outputs**:
  - Success (200): `{"message": "Device successfully archived"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error archiving device"}`

#### Get Device By User
- **Route**: `GET /getDeviceByUser/:userId`
- **Description**: Fetch all non-archived devices checked out by a specific user.
- **Access**: Admin Only
- **Inputs**: `userID`, Bearer Token
- **Outputs**:
  - Success (200): List of devices.
  - No Devices (200): `{"message": "No devices found for this user"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting devices for user"}`

---

# API Endpoints for Checkout System

## Authentication and Authorization:
- **Authorization Method**: Bearer Token (JWT)
- **Role Check**: The `isRoleAdmin` helper function verifies if a user has an admin role. Only users with admin roles can access these endpoints.

### Endpoints:

#### Get Checkouts
- **Route**: `GET /checkouts`
- **Description**: Fetches all non-archived checkouts.
- **Access**: Admin Only
- **Inputs**: Bearer Token
- **Outputs**:
  - Success (200): Returns all checkout objects (JSON).
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting checkouts"}`

#### Get Checkout by User
- **Route**: `GET /checkouts/user/:userId`
- **Description**: Fetches non-archived checkouts made by a specific user.
- **Access**: Admin Only
- **Inputs**: Bearer Token, User ID
- **Outputs**:
  - Success (200): Returns checkout object relating to the user (JSON).
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"error": "Error getting checkouts by user"}`

#### Get Checkouts by Device
- **Route**: `GET /checkouts/device/:deviceId`
- **Description**: Fetch all checkouts made for a particular device.
- **Access**: Admin Only
- **Inputs**: Bearer Token, Device ID
- **Outputs**:
  - Success (200): List of checkouts (JSON).
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error getting checkouts by device"}`

#### Create Checkout
- **Route**: `POST /checkouts`
- **Description**: Creates a new checkout record for a device.
- **Access**: Admin Only
- **Inputs**: Bearer Token, Device ID, User ID, Checkout Date
- **Outputs**:
  - Success (201): Newly created checkout object.
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error creating checkout"}`

#### Archive Checkout
- **Route**: `PUT /checkouts/archive/:id`
- **Description**: Archives a checkout record.
- **Access**: Admin Only
- **Inputs**: Bearer Token, Checkout ID
- **Outputs**:
  - Success (200): `{"message": "Checkout successfully archived"}`
  - Unauthorized (401): `{"message": "Not authorized for this data"}`
  - Error (500): `{"message": "Error archiving checkout"}`

---

These changes introduce improved structure to the device tracking system, allowing for better tracking and management of devices, locations, and checkouts.
