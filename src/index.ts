import axios from "axios"
import MentorCard from "./mentorCard";
import MentorData from "./mentorData";

const mentorsUrl = "https://next-gen.herokuapp.com/mentors"//"http://localhost:3000/mentors";

let mentorsData;
let dbData = loadDataFromDB(mentorsUrl);
dbData.then(data => {
    mentorsData = new MentorData((<any>data));

    if (document.getElementById("index")) {
        new MentorCard("mentors", mentorsData);
    }

    else if (document.getElementById("mentordetails")) {
        const regex = /[?](\w+)/g;
        const mentor = mentorsData.getMentorById(parseFloat(regex.exec(window.location.search)[1]));
        document.getElementById("mentor-name").innerHTML = `<h4>${mentorsData.getMentorName(mentor)}</h4>`;
        document.getElementById("current-role").innerHTML = mentorsData.getCurrentRole(mentor);
        document.getElementById("previous-role").innerHTML = mentorsData.getPreviousRole(mentor);
        document.getElementById("university").innerHTML = mentorsData.getUniversity(mentor);
        document.getElementById("high-school").innerHTML = mentorsData.getHighSchool(mentor);
        document.getElementById("description").innerHTML = mentorsData.getDescription(mentor);
        // document.getElementById("mentor-detail").innerHTML += mentorsData.createTags(mentor);
    
    }
});

function loadDataFromDB(dataUrl: string) {
    return new Promise(resolve => {
        axios({
            method: "get",
            url: dataUrl,
            withCredentials: true
        }).then(data => {
            resolve(data.data);
        });
    });
}