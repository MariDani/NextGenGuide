import * as data from '../dist/dummy.json';
import MentorCard from "./MentorCard";

// create mentor cards
let mentorCards = new MentorCard((<any>data), "mentors");

let mentorSearch = document.getElementById("mentor-search");
mentorSearch.addEventListener("keyup", () => {
    let searchString = (<HTMLInputElement>mentorSearch).value;
    console.log(searchString);

    // get search tags
    let searchTags = searchString.split(",");
    // hide not selected cards
    mentorCards.filterByTags(searchTags);
})