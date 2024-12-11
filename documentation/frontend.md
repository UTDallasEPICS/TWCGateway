# InventoryPage.jsx

**Purpose**:  
A page that displays the inventory table and includes options to register a new device and export the data.

### Inventory Table
- Fetches data about all devices from the backend and displays it on page mount (`useEffect`).
- Allows changing the status of a device by clicking on its status:
  - **Checked-in device**: Displays the `Checkout` component when clicked.
  - **Checked-out device**: Displays an option to check in the device when clicked.

### Register Device Button
- Displays the `RegisterDevice.jsx` component, allowing users to register a new device.  
- Requires input for:
  - Device make and model
  - Serial number
  - Cost
  - Department
  - Location
- Adds the new device to the database and redirects the user to a QR code for checking in the device (`QrCodePage.jsx`).

### Check-in Device
- When clicking on a currently checked-out device, the `Checkin.jsx` component displays.
- Shows a confirmation button that, when clicked, checks in the device by archiving the checkout.

### Check-out Device
- When clicking on a currently checked-in device, the `Checkout.jsx` component displays.
- Allows selecting:
  - Employee the device is being checked out to
  - Department and location of the device
- Displays the serial number of the device.
- Clicking the checkout button triggers an API call to create a new checkout for that device.

**Note**:  
The `RegisterDevice`, `Checkin`, and `Checkout` components are written in separate files in the `components` folder and are displayed on the inventory page using the `Popup.jsx` component.

---

# CheckoutPage.jsx

**Purpose**:  
A page allowing users to check in/out devices using a QR code.  
- When the QR code for a device is scanned, it redirects to this page:
  - **Checked-out device**: Displays a confirmation button to check it in.
  - **Checked-in device**: Displays a form to check the device out.

**Functionality**:  
The check-in/check-out features use the `Checkin.jsx` and `Checkout.jsx` components, as in the inventory table.

**Note**:  
Despite its name, `CheckoutPage.jsx` handles both check-in and check-out of devices.

---

# QrCodePage.jsx

**Purpose**:  
Automatically redirects users to this page after registering a new device.  
- Displays a downloadable QR code that links to the `CheckoutPage`.
- QR codes are generated using the `qrcode` package.

**Note**:  
If a user scans the QR code for a device, they may need to log in before accessing the website. After logging in, the link redirects them to the `CheckoutPage`.

---

# DeviceInfoPage.jsx

**Purpose**:  
A page with expanded information about a device.  
- Displays:
  - Information shown in the inventory table.
  - A record of checkouts for the device.
- Includes buttons to:
  - Delete the device.
  - Generate a QR code for the device.
