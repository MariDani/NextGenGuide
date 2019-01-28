import * as jsonData from '../dist/dummy.json';
import axios from "axios"
import MentorCard from "./mentorCard";
import MentorData from "./mentorData";

const url = "http://localhost:3000/absolvents";

axios({
    method: "get",
    url: url,
    withCredentials: true
}).then(data => {
    console.log(data);
})

let mentorsData = new MentorData((<any>jsonData));


if (document.getElementById("index")) {
    // create mentor cards

    let mentorCards = new MentorCard("mentors", mentorsData);

    // mentor search
    let mentorSearch = document.getElementById("mentor-search");
    mentorSearch.addEventListener("keyup", () => {
        let searchString = (<HTMLInputElement>mentorSearch).value;
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
