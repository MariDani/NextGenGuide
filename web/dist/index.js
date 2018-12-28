/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonData = __webpack_require__(1);
const mentorCard_1 = __webpack_require__(2);
const mentorData_1 = __webpack_require__(3);
let mentorsData = new mentorData_1.default(jsonData);
if (document.getElementById("index")) {
    // create mentor cards
    let mentorCards = new mentorCard_1.default("mentors", mentorsData);
    // mentor search
    let mentorSearch = document.getElementById("mentor-search");
    mentorSearch.addEventListener("keyup", () => {
        let searchString = mentorSearch.value;
        let searchTags = searchString.split(",");
        // hide not selected cards
        mentorCards.filterByTags(searchTags);
    });
}
if (document.getElementById("mentordetails")) {
    const regex = /[?](\w+)/g;
    const mentorIdx = mentorsData.getMentorIdxFromId(regex.exec(window.location.search)[1]);
    document.getElementById("mentor-name").innerHTML = mentorsData.getMentorName(mentorIdx);
    document.getElementById("mentor-detail").innerHTML += mentorsData.createTags(mentorIdx);
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"name":"John","surname":"Smith","tags":["IT","Economics"]},{"name":"Alan","surname":"Bet","tags":["Art","Economics"]},{"name":"Zuzka","surname":"D","tags":["IT","Art"]},{"name":"Mari","surname":"D","tags":["IT","Vis"]},{"name":"Mari","surname":"D","tags":["IT","Art"]},{"name":"Mari","surname":"D","tags":["Medical","Vis"]}]

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MentorCard {
    constructor(id, test) {
        this.test = test;
        this.data = test.getData();
        const mentorsDiv = document.getElementById(id);
        this.data.forEach((mentor, mentorIdx) => {
            let cardDiv = document.createElement("div");
            cardDiv.className = "cell large-3 medium-4";
            cardDiv.id = `mentor-${mentorIdx}`;
            cardDiv.innerHTML = this.createInnerHtml(mentor, mentorIdx);
            mentorsDiv.appendChild(cardDiv);
        });
    }
    createInnerHtml(mentor, mentorIdx) {
        return `<a href="mentors.html?${mentor.id}">\n` +
            '<div class="card mentor-card">\n' +
            '<img src="img/dummy-profile-image.jpg">\n' +
            '<div class="card-section">\n' +
            `<h4>${mentor.name} ${mentor.surname}</h4>\n` +
            '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam dui sem, fermentum vitae, sagittis id,malesuada in, quam.</p>\n' +
            this.test.createTags(mentorIdx) +
            '</div>\n' +
            '</div>\n' +
            '</a>\n';
    }
    filterByTags(tagsArray) {
        if (tagsArray[0] != "") {
            this.data.forEach((mentor, mentorIdx) => {
                let labels = document.getElementById(`mentor-${mentorIdx}`).getElementsByClassName("label");
                for (let label of labels) {
                    label.className = "label secondary";
                }
                let searchSuccess = false;
                tagsArray.forEach(searchTag => {
                    if (mentor.tags.indexOf(searchTag) > -1) {
                        searchSuccess = true;
                        for (let label of labels) {
                            if (label.innerHTML === searchTag) {
                                label.className = "label primary";
                            }
                        }
                    }
                    if (searchSuccess) {
                        document.getElementById(`mentor-${mentorIdx}`).style.display = "block";
                    }
                    else
                        document.getElementById(`mentor-${mentorIdx}`).style.display = "none";
                });
            });
        }
        else {
            this.data.forEach((mentor, mentorIdx) => {
                document.getElementById(`mentor-${mentorIdx}`).style.display = "block";
            });
        }
    }
}
exports.default = MentorCard;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MentorData {
    constructor(jsonData) {
        this.jsonData = jsonData;
        this.mentorIdList = new Array();
        this.tagList = new Array();
        jsonData.forEach(mentor => {
            mentor.id = this.createAvailableId(mentor.name, mentor.surname);
            this.updateTagList(mentor.tags);
        });
    }
    createAvailableId(name, surname) {
        let id = `${name.toLowerCase()}${surname.toLowerCase()}`;
        let index = 1;
        while (this.mentorIdList.includes(id)) {
            index++;
            id = id.replace(/\d+/g, '') + index;
        }
        this.mentorIdList.push(id);
        return id;
    }
    updateTagList(tags) {
        tags.forEach(tag => {
            if (this.tagList.indexOf(tag) === -1) {
                this.tagList.push(tag);
            }
        });
    }
    getData() {
        return this.jsonData;
    }
    getMentorByIdx(idx) {
        return this.jsonData[idx];
    }
    getMentorName(idx) {
        return `${this.jsonData[idx].name} ${this.jsonData[idx].surname}`;
    }
    createTags(idx) {
        let tagString = "";
        this.jsonData[idx].tags.forEach(tag => {
            tagString = tagString + `<span class="label secondary">${tag}</span>\n`;
        });
        return tagString;
    }
    getMentorIdxFromId(id) {
        let index = 0;
        while (this.jsonData[index].id != id && index < this.jsonData.length) {
            index++;
        }
        return index;
    }
}
exports.default = MentorData;


/***/ })
/******/ ]);