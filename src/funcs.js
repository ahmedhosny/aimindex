import _ from 'lodash';

/**
 * Cleans up the abstract and splits into words for the word Cloud
 * @param  {string} str Single string of abstracts added up.
 * @return {Array}     array of single clean words.
 */
export function processText(str) {
  str = str.toLowerCase();
  str = str.replace(/[^A-Za-z0-9_]/g, ' ');
  str = str.replace(/[0-9]/g, '');
  // str = str.removeStopWords();
  str = str.split(' ');
  str = _.countBy(str);
  let arr = [];
  // str.map(obj => {
  //   arr.push({
  //     word: obj,
  //     count: str[obj]
  //   });
  // });
  // arr = _.reverse(_.sortBy(arr, "count"));
  return arr;
}

/**
 * Pushes entries to a list if they are not equal to zero
 * @param  {array} listToPushTo  array to push to
 * @param  {array} listOfEntries array of entries - even if just one
 */
export function push(listToPushTo, listOfEntries) {
  listOfEntries.map((entry, idx) => {
    entry.toString() !== '0' ? listToPushTo.push(entry) : null;
  });
}

/**
 * Creates pairs from non-zero items to draw the heatmaps
 * @param  {array} listToPushTo array to push to
 * @param  {array} listA        Array of x axis - can have multiple entries
 * @param  {array} listB        Array of y axis - can have multiple entries
 */
// export function prepareDataForHeatmaps(listToPushTo, listA, listB) {
//   listA.map((a, idx) => {
//     listB.map((b, idx) => {
//       if ((a.toString() !== '0') & (b.toString() !== '0')) {
//         listToPushTo.push(a + '_' + b);
//       }
//     });
//   });
// }

/**
 * Creates pairs from non-zero items to draw the heatmaps
 * @param  {array} listToPushTo array to push to
 * @param  {array} listA        Array of x axis - can have multiple entries
 * @param  {array} listB        Array of y axis - can have multiple entries
 */
export function prepareDataForHisto2d(listToPushTo, listA, listB) {
  listA.map((a, idx) => {
    listB.map((b, idx) => {
      if ((a.toString() !== '0') & (b.toString() !== '0')) {
        listToPushTo.x.push(a);
        listToPushTo.y.push(b);
      }
    });
  });
}

/**
 * For data sharing only - pushes one or more of the four labels
 * @param  {array} listOfEntries [data_public, data_upon_request, data_shared]
 * @return {array} miniList a small lsit to be concatenated to the bigger list
 */
export function prepareDataSharing(listOfEntries) {
  let miniList = [];
  // if none of the above
  _.max(listOfEntries) === 0 ? miniList.push('data unavailable') : null;
  ifOne(miniList, listOfEntries[0], 'used public data');
  ifOne(miniList, listOfEntries[1], 'data made available upon request');
  ifOne(miniList, listOfEntries[2], 'data made public');
  return miniList;
}

/**
 * If an entry is 1, push a specific text to a given list
 * @param  {array} listToPushTo array tp push to
 * @param  {number} entry      treat as string
 * @param  {string} text       text to push to list
 */
function ifOne(listToPushTo, entry, text) {
  entry.toString() === '1' ? listToPushTo.push(text) : null;
}
