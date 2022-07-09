# chart-editor-backend
A simple server for chart-editor.  
This folder is the same as the [chart-editor-backend](https://github.com/HHN0609/chart-editor-backend).

# How to use 
1. `git clone https://github.com/HHN0609/chart-editor-backend.git` 
2. `cd chart-editor-backend` 
3. `npm install` 
4. Before you run this project, you should change the *db* in `./src/config.js` to adapt your local Mysql.
5. Copy the content of [chart_editor_db.sql](./src//sql/chart_editor_db.sql), then paste into your local Mysql command line to initial the databaset which called `chart_editor_db`.
6. `npm run serve` 
7. If no mistakes, it will run on `http://127.0.0.1:3000/` 

# Tables in `chart_editor_db` 
1. user_info 
    > User basic information 
    ~~~
    +----------+------------+------+-----+---------+-------+
    | Field    | Type       | Null | Key | Default | Extra |
    +----------+------------+------+-----+---------+-------+
    | account  | char(15)   | NO   | PRI | NULL    |       |
    | name     | char(15)   | YES  |     | NULL    |       |
    | pwd      | char(15)   | YES  |     | NULL    |       |
    | is_admin | tinyint(4) | YES  |     | NULL    |       |
    +----------+------------+------+-----+---------+-------+
    ~~~
2. project_info 
    ~~~
    +--------------+----------+------+-----+---------+-------+
    | Field        | Type     | Null | Key | Default | Extra |
    +--------------+----------+------+-----+---------+-------+
    | project_id   | char(50) | NO   | PRI | NULL    |       |
    | project_name | char(15) | YES  |     | NULL    |       |
    | owner        | char(15) | YES  | MUL | NULL    |       |
    | create_time  | datetime | YES  |     | NULL    |       |
    | last_modify  | datetime | YES  |     | NULL    |       |
    +--------------+----------+------+-----+---------+-------+
    ~~~
3. project_basic 
    ```
    +----------------+----------+------+-----+---------+-------+
    | Field          | Type     | Null | Key | Default | Extra |
    +----------------+----------+------+-----+---------+-------+
    | project_id     | char(50) | NO   | MUL | NULL    |       |
    | width          | int(5)   | NO   |     | NULL    |       |
    | height         | int(5)   | NO   |     | NULL    |       |
    | init_zoom      | double   | NO   |     | 1       |       |
    | bg_color       | char(20) | NO   |     | #DCDCDC |       |
    | viewport_color | char(20) | NO   |     | #272C2C |       |
    +----------------+----------+------+-----+---------+-------+
    ``` 
4. chart_detail_info 
    > Store the chart data. Because a chart contain much information, I use `json` to record charts' data.
    ```
    +--------------+----------+------+-----+---------+-------+
    | Field        | Type     | Null | Key | Default | Extra |
    +--------------+----------+------+-----+---------+-------+
    | project_id   | char(50) | NO   | MUL | NULL    |       |
    | chart_id     | char(50) | NO   | PRI | NULL    |       |
    | chart_detail | json     | YES  |     | NULL    |       |
    +--------------+----------+------+-----+---------+-------+
    ```

# Api provided 
……（You can see `./routers` temporarily, I will provide api description when I have spare time.）