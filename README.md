# emp-auth

Login system built using Express, MySQL and PassportJS

## How to use this project
### Installation
1. Clone this repo
``` git clone https://github.com/ReuelO/emp-auth.git ```

2. Access the repo
``` cd emp-auth ```

3. Install node modules
``` npm install ```

### Usage
1. Import database file (to store data)
- you will need MySQL [PHPMyAdmin] (or any other alternative) to run a database
- on PHPMyAdmin, select "import" on the main dashboard
- click "choose file" (/emp-auth/config/db.php), then "go"
> you now have a database "emp_auth" with a "users" table where all users' data will be saved

2. Run the project on the command console
``` npm start ```

3. To view the project, open your browser and type in **http://localhost:8000**

### Features
- [x] simple, clean UI
- [x] can securely register and log in (password is encrypted)
- [x] can edit profile (add other user details)
- [x] can change password

> 💪 Enjoy!
