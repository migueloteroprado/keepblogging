# Keep Blogging

*A list of articles of different categories*

---

# Installation #

Open a shell, got to app root folder and execute command:

``` shell
npm install
```

All modules required will be downloaded and installed.

### Configure API URL

The app uses a fake API REST called "*json-server*", which stores data in a simple json file.
To configure the URL and port on which the API will listen:

1. Copy file "*.env.example*" to "*.env*"

2. In "*.env*" file, configure URL and port, in environment variable "API_URL"
Default value is "http://localhost:8000/".
Example:
``` shell
API_URL=http://localhost:8000/
```

3. Open file *package.json*, and make sure that in the entry "scripts" --> "server", the parameters "--host" and "--port" are the same that indicated in *.env* file.
Example:
``` shell
 "scripts": {
     "server": "cd src/data && json-server --watch db.json --port=8000 --host=localhost --delay=100"
 }
```
Note: the *delay* parameter indicates the miliseconds that the server will delay in delivering data, useful for testing purposes

### Install Database

Copy file "*db.sample.json*" in folder "*src/data*" to "db.json".

---

# Execution

### Run API Server (json-server)

Open a shell and run the command:

``` shell
npm run server
```

The API server must be running for the application to retrieve data correctly.


### Run Development Server

In a shell, run the command:
``` shell
npm start
```

The development server will listen by default on port 3000.
To change this port, open file "*webpack.dev-config.js*", and change the value in the entry "*port*" oft the devServer configuration object.
Example:
``` javascript
devServer: {
	open: false,
	overlay: true,
	port: 3000
  }
```

### Build Production app

In a shell, run the command:
``` shell
npm run build
```
The produccion app will generated in the folder "***dist***"

---
# App Description

All pages share a common header and footer.

The header will show:
- The name and the logo.
Clicking here we will return to the home page, the articles listing.
- A menú with some of the categories available. 
Clicking on each category will show only the articles of the category selected.
Clicking on "More..." button will show a page with a list of all categories available
- A Search input text. It will will filter only the articles wich contains the introduced text in any field (title, summary, body, ...)
- Login and Register buttons (with no functionality).

The footer wil show:
-The name of the app, clicking it home page will be loaded (list of articles).
-The page currently showed (List of articles, Article detail or List of categories).

When scrolling down, a button will appear on the bottom right of the page, clicking will scroll to the the top of the page. 

### Articles page

The app shows a list of articles of different categories.
Every article will show:
- Header:
	-	Article's title
	- Category
- Content:
	- Image (if available)
	- Video (if available)
	- Summary
- Footer
	- Publish date.
	If the article was published less than a day ago, it will show the relative date (5 minutes ago, 4 hours ago, ...)
	- Author (name, email and photo) 
	If user has no photo, a pleceholder image will be loaded)
	- Comments number (clicking will load the article detail page, and it will show directly the comments section).
	Note: given json-server limitations, an extra request to then API will be necesary for every article. A real backend should return this number directly in the list of articles.

Clicking the title or the image of every article will load the article detail page.

### Article Detail Page

The article detail page will show:
- Header
	- The article's title
	- A "Like" button in the top right corner. 
	Clicking it will toggle the like status, and it will be saved on the navigator's local storage.
	- Category
- Content
	- Image (if available)
	- Video (if available)
	- Article's body
- Comments Section
	- Add Comment Form
	The user cand add new comments, introducing his name, email and comment text.
	All fileds are required, and email must be a valid email address.
	- Comments List
	The list will be paginated, showing 5 commentes per page, with buttons to go to the first, previous, next and last page.

### Categories Page

Shows a list of all categories available.
Clicking one category button will load the articles page, showing only the articles of the selected category.

---

## API Database Structure

The API database file is located in folder *src/data/db.json*

It contains the following collections with the following fields:
* Users
	* id
	* name
	* email
	* imageURL
* Categories
	* id
	* name
* Articles
	* id
	* categoryId
	* userId
	* title
	* imageURL
	* videoURL
	* summary
	* body
	* timestamp
	* like
* Comments
	* id
	* articleId
	* name
	* email
	* comment
	* timestamp

---

# Notes for Instructor

* **Get comments number for every article:**
The number of comments of the articles is obtained by making an extra request to the API for each article, since the json server did not offer ways to include this number when obtaining the articles. It is assumed that the supposed real backend would already return this number in the request of the list of articles.

* **Article image load:**
Since the json-server is also capable of serving images, in some articles (music category), the URL of the image has been configured to be served from this backend.
Four images have been created, one by default, and others for the widths of 600, 900 and 1200 pixels wide, to load the appropriate to each resolution using an srcset, and this logic has been added in the javascript of the component that generates the HTML.
The user 1 photo also loads from this backend.
For the rest of the images coming from other URLs, simply the srcset will fail and the default image will be obtained.

	**Problem**: by default the json-server listen on 'localhost'. If we want to use another IP address for testing on another computer, it would be necessary to make the following changes:
	* Change the IP address on .env file
	* Change the IP address on package.json script entry for "server"
	* Change the URL of the images in *db.json*, for the field 'imageURL' of user 1 and articles 2 and 5.

* **Fonts**
The app uses two google fonts (Muli and Cabin), which are loaded from *assets/fonts* folder using the file-loader webpack plugin.

* **Animations**
The app uses the animations library "scrollreveal" (https://github.com/scrollreveal/scrollreveal)
