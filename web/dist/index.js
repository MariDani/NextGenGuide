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
    document.getElementById("mentor-detail").innerHTML += mentorsData.createTags(mentorIdx, "keywords") + mentorsData.createTags(mentorIdx, "places");
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"name":"Honza","surname":"Hrkal","keywords":["Marketing","Management"],"places":["Germany","Netherlands"]},{"name":"Betka","surname":"Mayova","keywords":["Finance","Economics"],"places":["India","UK"]},{"name":"Zuzka","surname":"Dostalova","keywords":["IT","Art"],"places":["Prague","Munich"]},{"name":"Mari","surname":"Danielova","keywords":["IT","Vis"],"places":["Prague","Dresden"]},{"name":"Mari","surname":"D","keywords":["IT","Art"],"places":["Prague","Wien"]},{"name":"Mari","surname":"D","keywords":["Medical","Vis"],"places":["Prague","Sweden"]}]

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MentorCard {
    constructor(id, mentorData) {
        this.mentorData = mentorData;
        this.data = mentorData.getData();
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
            '<img src="img/dummy-profile-image.png" class="img-circle float-center">\n' +
            '<div class="card-section">\n' +
            `<h4 class="text-center">${mentor.name} ${mentor.surname}</h4>\n` +
            '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam dui sem, fermentum vitae, sagittis id,malesuada in, quam.</p>\n' +
            this.mentorData.createTags(mentorIdx, "keywords") +
            this.mentorData.createTags(mentorIdx, "places") +
            '</div>\n' +
            '</div>\n' +
            '</a>\n';
    }
    filterByTags(tagsArray) {
        if (tagsArray[0] != "") {
            this.data.forEach((mentor, mentorIdx) => {
                let labels = document.getElementById(`mentor-${mentorIdx}`).getElementsByClassName("label");
                for (let label of labels) {
                    label.className = "label label-not-selected";
                }
                let searchSuccess = false;
                tagsArray.forEach(searchTag => {
                    if (mentor.keywords.indexOf(searchTag) > -1) {
                        searchSuccess = true;
                        for (let label of labels) {
                            if (label.innerHTML === searchTag) {
                                label.className = "label label-selected";
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
        this.placeList = new Array();
        jsonData.forEach(mentor => {
            mentor.id = this.createAvailableId(mentor.name, mentor.surname);
            this.updateList(this.tagList, mentor.keywords);
            this.updateList(this.placeList, mentor.places);
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
    updateList(list, elements) {
        elements.forEach(element => {
            if (list.indexOf(element) === -1) {
                list.push(element);
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
    createTags(idx, tagGroup) {
        let tagString = "";
        this.jsonData[idx][tagGroup].forEach(tag => {
            tagString = tagString + `<span class="label label-not-selected">${tag}</span>\n`;
        });
        return "<div>" + tagString + "</div>\n";
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