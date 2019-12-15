# hugo-get-pocket
This is a Hugo project that view bookmarks from my [get-pocket app](https://app.getpocket.com/). Using [get-pocket API](https://getpocket.com/developer/) to generate json file, to use in a [hugo website](https://gohugo.io/).

Here is the [finnished product](https://get-pocket.netlify.com/tags/hugo/). This is my private pocket content. 



## Installation instructions

```bash
## Clone repo
git clone <This repository>

## Setting your credentials manually 
## in uppercase environment variables.
## Don't store them in public gitHub repo.
## More on getting the credentials is described later on.
export CONSUMER_KEY=<your secret key>
export ACCESS_TOKEN=<your secret token>

## Install dependencies
npm install

## Build command.
## Fetching data from pocket API and
## generate the Hugo site.
npm start
```



## Credentials to access your Pocket content

To get your Pocket content, you need to generate an consumer_key and an access_token for communication over the Pocket API. I find the original [Pocket documentation](https://getpocket.com/developer/docs/authentication) not the best on explaining this. This [blogpost](https://www.jamesfmackenzie.com/getting-started-with-the-pocket-developer-api/) describe the process much clearer. Follow the steps described carefully.

## Tags to ignore

You can setup tags to be ignored in the import. This solution is totaly public. If you have sensitive information that not could be imported. You can do it this way. The file [/get-pocket-api/config.json](./get-pocket-api/config.json) contains the variable TAGS_TO_IGNORE. Here is a sample

```json
 "TAGS_TO_IGNORE": [
    "secret",
    "personal",
    "avoid taxes"
  ]
```



## Special tags

There are two special tags witch you cant find in your pocket account:

| Tag         | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| new content | Inside this tag you can find the latest tags added to your pocket list. You can edit the amount of bookmarks that could be inside this tag. Default is 20 bookmarks. You can sett the amount of bookmarks in th variable LATEST_TAGS_COUNT inside the [/get-pocket-api/config.json](./get-pocket-api/config.json) file |
| stared      | This tag contains all your stared bookmarks from Pocket      |

## Application structure

The application is build of three parts witch is ran in given order. Look at the file [package.json](./package.json), the start script:

| File                                                        | Task                                      | Desription                                                   |
| ----------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| [/get-pocket-api/index.js](./get-pocket-api/index.js)       | Read from Pocket API                      | - Reads data from pocket API using the credentials.<br />- Build the json file [./data/pocketdata.json](/data/pocketdata.json) inside Hugo data folder. The json file structure is tailored to be used in Hugo with no further formating. |
| [/get-pocket-api/markdown.js](./get-pocket-api/markdown.js) | Generate tags(taxonomies) for use in Hugo | - Using the json file generated in previous step to collect all tags in a list.<br /> - The list is used to generate all the tags(taxonomy) for the Hugo site<br /> - Generating a markdown file with all the tags in the list [/content/bookmarks/all-my-tags.md](./content/bookmarks/all-my-tags.md) |
| [Hugo site](./../../)                                       | Hugo site                                 | At last a Hugo site is generated.                            |

