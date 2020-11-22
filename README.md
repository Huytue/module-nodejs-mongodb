# module-nodejs-mongodb

**Một module sử dụng Nodejs kết nối cùng mongodb**

1.  Cài đặt package

    > **npm i module-nodejs-mongodb**

2.  Gọi module để sử dụng

    > const modules = require("module-nodejs-mongodb")

3.  Create Database (MongoDB)

- **Mongodb Online**
  > modules.mongodb("mongodb+srv://<username>:<password>@<url>/<db-name>?retryWrites=true&w=majority");
- **Mongodb Local**
  > modules.mongodb("ManageStudent");

4. Load app
   > modules.app ()
5. Generate dữ liệu

- Create Class
  > modules.generateClass();
- Create Student
  > modules.generateStudent();

## Run app in command line

> node index.js
