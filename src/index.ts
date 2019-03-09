import MentorCards from "./mentorCards";
import MentorDetail from "./mentorDetail";

const dbUrl = "https://next-gen.herokuapp.com"//"http://localhost:3000/mentors";

if (document.getElementById("mentordetails")) {
    const regex = /[?](\w+)/g;
    new MentorDetail(dbUrl, parseFloat(regex.exec(window.location.search)[1]));
}

if (document.getElementById("index")) {
    new MentorCards(dbUrl);
}