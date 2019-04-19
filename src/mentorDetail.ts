import { loadDataFromDB, checkUrl, MentorDataProperties } from "./mentorCards";

export default class MentorDetail {
    mentor: MentorDataProperties;

    constructor(dbUrl: string, id: number) {
        const mentorDataPromise = loadDataFromDB(`${checkUrl(dbUrl)}/mentors/${id}`);
        mentorDataPromise.then(data => {
            const mentors = <any>data;
            if (mentors.length > 0) {
                this.mentor = mentors[0];
                this.createMentorProfile();
            }
            //  TO DO: what shall be displayed if ID does not exist
        });
    }

    private createMentorProfile() {
        this.showMentorName();
        this.showTags();
        this.showProfilePicture();
        this.showDescription();
        this.moreAboutMentor();
        this.showContactButton();
        this.showEducationTable();
        this.showCareerTable();
    }

    private showMentorName() {
        document.getElementById("mentor-name").innerHTML = `<h4>${this.mentor.first_name} ${this.mentor.last_name}</h4>`;
    }

    private showTags() {
        document.getElementById("mentor-tags").innerHTML = createTags(this.mentor);
    }

    private showProfilePicture() {
        (<HTMLImageElement>document.getElementById("mentor-pic-detail")).src = this.mentor.image_url;
    }

    private moreAboutMentor() {
        document.getElementById("more-about-mentor").innerHTML = `<h5>More about ${this.mentor.first_name}:</h5>`;
    }

    private showContactButton() {
        let contactHtml = `<a class="button" href="mailto:mentors.nextgen@gmail.com?subject=For ${this.mentor.first_name} ${this.mentor.last_name} (DO NOT CHANGE)">Contact ${this.mentor.first_name}</a>`;
        document.getElementById("contact-me").innerHTML = contactHtml;
    }

    private showEducationTable() {
        const tableHeader = `<thead>\n
        <tr>\n
          <th><div>University/School</div></th>\n
          <th><div>Program</div></th>\n
          <th><div>Country</div></th>\n
          <th><div>Graduation</div></th>\n
        </tr>\n
        </thead>\n`;

        let tableBody = "<tbody>\n";

        // university
        for (let idx = 1; idx <= 3; idx++) {
            if (this.mentor[`university_${idx}_name`]) {
                tableBody += `<tr>\n <td>${this.mentor[`university_${idx}_name`]}</td>\n`;
                tableBody += `<td>${this.mentor[`university_${idx}_program`] ? this.mentor[`university_${idx}_program`] : ""}</td>\n`
                tableBody += `<td>${this.mentor[`university_${idx}_country`] ? this.mentor[`university_${idx}_country`] : ""}</td>\n`;
                tableBody += `<td>${this.mentor[`university_${idx}_grad_year`] ? this.mentor[`university_${idx}_grad_year`] : ""}</td>\n`;
                tableBody += "</tr>\n";
            }
        }

        // international high school
        if (this.mentor.high_school_abroad) {
            tableBody += `<tr>\n <td>${this.mentor.high_school_abroad}</td>\n`;
            tableBody += `<td>-</td>\n <td>${this.mentor.high_school_abroad_country ? this.mentor.high_school_abroad_country : ""}</td>\n`;
            tableBody += `<td>-</td>\n`;
            tableBody += "</tr>\n";
        }

        // czech high school
        if (this.mentor.high_school_name) {
            tableBody += `<tr>\n <td>${this.mentor.high_school_name}</td>\n`;
            tableBody += `<td>-</td>\n <td>Czech Republic</td>\n`;
            tableBody += `<td>${this.mentor.maturita_year ? this.mentor.maturita_year : ""}</td>\n`;
            tableBody += "</tr>\n";
        }

        tableBody += "</tbody>\n";

        if (tableBody != "<tbody>\n") {
            document.getElementById("education-table").innerHTML = tableHeader + tableBody;
        }
    }

    private showCareerTable() {
        const tableHeader = `<thead>\n
        <tr>\n
          <th><div>Company</div></th>\n
          <th><div>Role</div></th>\n
          <th><div>Industry</div></th>\n
          <th><div>Country</div></th>\n
        </tr>\n
        </thead>\n`;

        let tableBody = "<tbody>\n";

        // current role
        if (this.mentor.company) {
            tableBody += `<tr>\n <td>${this.mentor.company}</td>\n`;
            tableBody += `<td>${this.mentor.role}</td>\n`;
            tableBody += `<td>${this.mentor.working_industry ? this.mentor.working_industry : ""}</td>\n`;
            tableBody += `<td>${this.mentor.country ? this.mentor.country : ""}</td>\n`;
            tableBody += "</tr>\n";
        }

        // previous
        if (this.mentor.previous_company) {
            tableBody += `<tr>\n <td>${this.mentor.previous_company}</td>\n`;
            tableBody += `<td>${this.mentor.previous_role}</td>\n`;
            tableBody += `<td>${this.mentor.previous_industry ? this.mentor.previous_industry : ""}</td>\n`;
            tableBody += `<td>${this.mentor.previous_country ? this.mentor.previous_country : ""}</td>\n`;
            tableBody += "</tr>\n";
        }

        tableBody += "</tbody>\n";
        if (tableBody != "<tbody>\n") {
            document.getElementById("career-table").innerHTML = tableHeader + tableBody;
        }
    }

    private showDescription() {
        let descHtml = "";
        if (this.mentor.description) {
            descHtml =
                `<div class="large-offset-1 medium-offset-1">\n`

            descHtml += `<p>${this.mentor.description}</p>`;

            descHtml +=
                `</div>`;
        }
        document.getElementById("description").innerHTML = descHtml;
    }
}

export function createTags(mentor: MentorDataProperties) {
    let tagHtml = "<div class='label-parent'>\n";
    let universityPrograms: Array<String> = [];
    let countries: Array<String> = [];
    let industries: Array<String> = [];
    if (mentor.country) countries.push(mentor.country);
    if (mentor.previous_country && countries.indexOf(mentor.previous_country) < 0) countries.push(mentor.previous_country)
    for (let idx = 1; idx <= 3; idx++) {
        if (mentor[`university_${idx}_program`] && universityPrograms.indexOf(<String>mentor[`university_${idx}_program`]) < 0) {
            universityPrograms.push(<String>mentor[`university_${idx}_program`]);
        }
        if (mentor[`university_${idx}_country`] && countries.indexOf(<String>mentor[`university_${idx}_country`]) < 0) {
            countries.push(<String>mentor[`university_${idx}_country`]);
        }
    }
    if (mentor.high_school_abroad_country && countries.indexOf(mentor.high_school_abroad_country) < 0) countries.push(mentor.high_school_abroad_country)
    if (mentor.working_industry) industries.push(mentor.working_industry);
    if (mentor.previous_industry && industries.indexOf(mentor.previous_industry) < 0) industries.push(mentor.previous_industry);

    universityPrograms.forEach(program => {
        tagHtml = tagHtml + `<span class="label label-color-a">${<String>program}</span>\n`
    });
    tagHtml = tagHtml + "</div>\n";

    tagHtml = tagHtml + "<div class='label-parent'>\n";
    industries.forEach(industry => {
        tagHtml = tagHtml + `<span class="label label-color-b">${<String>industry}</span>\n`
    });
    tagHtml = tagHtml + "</div>\n";

    tagHtml = tagHtml + "<div class='label-parent'>\n";
    countries.forEach(country => {
        tagHtml = tagHtml + `<span class="label label-color-c">${<String>country}</span>\n`
    });
    tagHtml = tagHtml + "</div>\n";

    return tagHtml;
}