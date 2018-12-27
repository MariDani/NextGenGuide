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
const data = __webpack_require__(1);
const MentorCard_1 = __webpack_require__(2);
// create mentor cards
let mentorCards = new MentorCard_1.default(data, "mentors");
let mentorSearch = document.getElementById("mentor-search");
mentorSearch.addEventListener("keyup", () => {
    let searchString = mentorSearch.value;
    console.log(searchString);
    // get search tags
    let searchTags = searchString.split(",");
    // hide not selected cards
    mentorCards.filterByTags(searchTags);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"name":"John","surname":"Smith","tags":["IT","Economics"]},{"name":"Alan","surname":"Bet","tags":["Art","Economics"]},{"name":"Zuzka","surname":"D","tags":["IT","Art"]},{"name":"Mari","surname":"D","tags":["IT","Vis"]}]

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MentorCard {
    constructor(data, id) {
        this.data = data;
        const mentorsDiv = document.getElementById(id);
        data.forEach((mentor, mentorIdx) => {
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = this.createInnerHtml(mentor, mentorIdx);
            mentorsDiv.appendChild(cardDiv);
        });
    }
    createInnerHtml(mentor, mentorIdx) {
        return `<div class="cell" id="mentor-${mentorIdx}">\n` +
            '<div class="card mentor-card">\n' +
            '<img src="img/dummy-profile-image.jpg">\n' +
            '<div class="card-section">\n' +
            `<h4>${mentor.name} ${mentor.surname}</h4>\n` +
            '<p>It has an easy to override visual style, and is appropriately subdued.</p>\n' +
            this.createTags(mentor) +
            '</div>\n' +
            '</div>\n' +
            '</div>\n';
    }
    createTags(mentor) {
        let tagString = "";
        mentor.tags.forEach(tag => {
            tagString = tagString + `<span class="label secondary">${tag}</span>\n`;
        });
        return tagString;
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


/***/ })
/******/ ]);