import axios from "axios";
import { createTags } from "./mentorDetail"

// based on exact db structure
export interface MentorDataProperties {
    [key: string]: string | number,
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    high_school_name: string
    maturita_year: number,
    high_school_abroad?: string,
    high_school_abroad_country?: string,
    university_1_name: string,
    university_1_country: string,
    university_1_program: string,
    university_1_grad_year?: number,
    university_2_name?: string,
    university_2_country?: string,
    university_2_program?: string,
    university_2_grad_year?: number,
    university_3_name?: string,
    university_3_country?: string,
    university_3_program?: string,
    university_3_grad_year?: number,
    working_industry: string,
    role: string,
    company: string,
    country: string,
    previous_role?: string,
    previous_company?: string,
    previous_country?: string,
    image_url: string,
    description: string
}

export default class MentorCards {
    mentors: Array<MentorDataProperties>;

    constructor(dbUrl: string) {
        const mentorDataPromise = loadDataFromDB(`${checkUrl(dbUrl)}/mentors`);
        mentorDataPromise.then(data => {
            this.mentors = <any>data;
            this.createMentorCards();
        });
    }

    private createMentorCards() {
        const mentorsDiv = document.getElementById("mentors");

        this.mentors.forEach((mentor, index) => {
            let cardDiv = document.createElement("div");
            if (index % 2 === 0){
                cardDiv.className = "cell medium-5 medium-offset-1";
            }
            else cardDiv.className = "cell medium-5";
            cardDiv.id = `mentor-${mentor.id}`;
            cardDiv.innerHTML = this.createInnerHtml(mentor);
            mentorsDiv.appendChild(cardDiv);
        });
    }

    private createInnerHtml(mentor: MentorDataProperties) {
        return `<a href="mentors.html?${mentor.id}">\n` +
            '<div class="card mentor-card">\n' +
            this.createPicPreview(mentor.image_url) +
            '<div class="card-section">\n' +
            `<h4 class="text-center">${mentor.first_name} ${mentor.last_name}</h4>\n` +
            createTags(mentor) +
            '</div>\n' +
            '</div>\n' +
            '</a>\n';
    }

    private createPicPreview(image_url: string) {
        return `<img src="${image_url}" class="img-circle float-center">\n`
    }
}

export function loadDataFromDB(dataUrl: string) {
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

export function checkUrl(url: string) {
    if (url.charAt(url.length - 1) == "/") {
        url = url.substr(0, url.length - 1);
    }
    return url;
}