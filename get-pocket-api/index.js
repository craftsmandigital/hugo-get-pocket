const impJSON = require("./import-json.js");

function main(data) {
  const fs = require("fs");
  // https://medium.com/@pativancarrasco/why-your-es6-syntax-doesnt-work-in-node-js-and-how-to-fix-it-161f0708f1ad
  // import { TAGS_TO_IGNORE, UNTAGED, data } from './config.js';
  const config = require("./config.json");
  //   const data = require(config.input);
  // Get an easier list to work with (array)
  const objectList = Object.values(data.list);

  // sorting data on date bookmarks creatded
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  objectList.sort((a, b) =>
    a.time_updated > b.time_updated
      ? -1
      : b.time_updated > a.time_updated
      ? 1
      : 0
  );

  // building an easy list to handle for other programs
  let outputList = [];
  objectList.forEach((obj, index) => {
    // If object don't have tags then give it a tag of name UNTAGED constant.
    // else build a beautiful array(tagList) to hold the tags for obj
    let tagList;
    if (typeof obj.tags === "undefined") {
      tagList = [config.UNTAGED];
    } else {
      tagList = Object.keys(obj.tags);
    }

    // Remove objects that have tags that are in the TAGS_TO_IGNORE list
    // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript/29447130
    // finishing this loop iteration if I could ignore this record (obj)
    if (tagList.some(r => config.TAGS_TO_IGNORE.includes(r))) {
      return;
    }

    // Creates a special tag for newest bookmarks.
    if (index < config.LATEST_TAGS_COUNT) {
      tagList.push(config.LATEST_TAGS);
    }

    // Convert from unix date to normal date
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    function normalDate(unixDate) {
      return new Date(Number(unixDate) * 1000);
    }

    // Return fields that is nessesary for this purpose.
    const outputObj = {
      item_id: obj.item_id,
      time_added: normalDate(obj.time_added),
      time_updated: normalDate(obj.time_updated),
      given_url: obj.given_url,
      given_title: obj.given_title,
      favorite: obj.favorite,
      excerpt: obj.excerpt,
      word_count: obj.word_count,
      top_image_url: obj.top_image_url
    };

    // transforming it to the right output format
    tagList.forEach(tagItem => {
      // Remove the active tag.
      // if tagList onely include one tag, then it must be the
      // active tag --> no ned to add it to outputObj
      if (tagList.length > 1) {
        outputObj.tags = tagList;
        outputObj.tags.splice(tagList.indexOf(tagItem), 1);
      }

      // add a new tag and it's first item, if it's not added to array (outputList) before.
      // else just push obj to the tags item list
      if (!outputList.map(x => x.tag).includes(tagItem)) {
        outputList.push({
          tag: tagItem,
          items: [outputObj]
        });
      } else {
        // get index in objList were current tag(inner_element) is living
        const i = outputList.map(x => x.tag).indexOf(tagItem);
        // adding record to corresponding tag
        outputList[i].items.push(outputObj);
      }
    });
  });

  // sort array on tag
  outputList.sort((a, b) => (a.tag > b.tag ? 1 : b.tag > a.tag ? -1 : 0));

  // adding a new field to outputList, containing
  // the count of items
  outputList = outputList.map(x => Object.assign(x, { count: x.items.length }));

  // console.log(
  //   outputList
  // );

  // writing to JSON file
  fs.writeFile(config.output, JSON.stringify(outputList), function(err) {
    if (err) {
      console.log(err);
    }
  });
  // console.log(JSON.stringify(objectList));
//   console.log(outputList);
}

impJSON.importJSONfile().then(result => {
  main(result);
});
