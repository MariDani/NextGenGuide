import MentorCards from "./mentorCards";
import MentorDetail from "./mentorDetail";
import axios from "axios";

const dbUrl = "https://next-gen.herokuapp.com"//"http://localhost:3000/mentors";

axios({ method: "get", url: "https://next-gen.herokuapp.com/health", withCredentials: true });

if (document.getElementById("mentordetails")) {
    const regex = /[?](\w+)/g;
    new MentorDetail(dbUrl, parseFloat(regex.exec(window.location.search)[1]));
}

if (document.getElementById("mentordb")) {
    new MentorCards(dbUrl);
}