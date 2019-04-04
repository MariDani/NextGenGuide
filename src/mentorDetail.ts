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
        // this.showCurrentRole();
        // this.showPreviousRole();
        // this.showUniversity();
        // this.showHighSchool();
    }

    private showMentorName() {
        document.getElementById("mentor-name").innerHTML = `<h4>${this.mentor.first_name} ${this.mentor.last_name}</h4>`
    }

    private showTags() {
        document.getElementById("mentor-tags").innerHTML = createTags(this.mentor)
    }

    private showProfilePicture() {
        (<HTMLImageElement>document.getElementById("mentor-pic-detail")).src = this.mentor.image_url;
    }

    private showCurrentRole() {
        let currRoleHtml = "";
        if (this.mentor.role) {
            currRoleHtml += `<h7 class="subheader"><small>Current role</small></h7>\n` +
                `<div class="large-offset-2 medium-offset-2">\n` +
                `<ul class="no-bullet">\n`;

            currRoleHtml += `<li>${this.mentor.role}</li>\n`;
            if (this.mentor.working_industry) currRoleHtml += `<li>${this.mentor.working_industry}</li>\n`;
            if (this.mentor.company) {
                if (this.mentor.country) currRoleHtml += `<li>${this.mentor.company}, ${this.mentor.country}</li>\n`;
                else `<li>${this.mentor.company}</li>\n`;
            }

            currRoleHtml +=
                `</ul>\n` +
                `</div>`;
        }
        document.getElementById("current-role").innerHTML = currRoleHtml;
    }

    private showPreviousRole() {
        let prevRoleHtml = "";
        if (this.mentor.previous_role) {
            prevRoleHtml += `<h7 class="subheader"><small>Previous role</small></h7>\n` +
                `<div class="large-offset-2 medium-offset-2">\n` +
                `<ul class="no-bullet">\n`;

            prevRoleHtml += `<li>${this.mentor.previous_role}`;
            if (this.mentor.previous_company) prevRoleHtml += `, ${this.mentor.previous_company}`;
            if (this.mentor.previous_country) prevRoleHtml += `, ${this.mentor.previous_country}`;
            prevRoleHtml += `</li>\n`;

            prevRoleHtml +=
                `</ul>\n` +
                `</div>`;
        }

        document.getElementById("previous-role").innerHTML = prevRoleHtml;
    }

    private showHighSchool() {
        let highSchHtml = "";
        if (this.mentor.high_school_name || this.mentor.high_school_abroad) {
            highSchHtml +=
                `<h7 class="subheader"><small>High school education</small></h7>\n` +
                `<div class="large-offset-1 medium-offset-1">\n` +
                `<ul class="no-bullet">\n`;

            if (this.mentor.high_school_name) {
                highSchHtml += `<li>${this.mentor.high_school_name}`;
                if (this.mentor.maturita_year) highSchHtml += `<small>, graduated ${this.mentor.maturita_year}</small>`;
                highSchHtml += `</li>\n`;
            }
            if (this.mentor.high_school_abroad) {
                highSchHtml += `<li>${this.mentor.high_school_abroad}`;
                if (this.mentor.high_school_abroad_country) highSchHtml += `, ${this.mentor.high_school_abroad_country}`;
                highSchHtml += `</li>\n`;
            }

            highSchHtml +=
                `</ul>\n` +
                `</div>`;
        }
        document.getElementById("high-school").innerHTML = highSchHtml;
    }

    private showUniversity() {
        let uniHtml = "";
        if (this.mentor.university_1_name || this.mentor.university_2_name || this.mentor.university_3_name) {

            uniHtml += `<h7 class="subheader"><small>University education</small></h7>\n` +
                `<div class="large-offset-1 medium-offset-1">\n` +
                `<ul class="no-bullet">\n`;

            for (let idx = 1; idx <= 3; idx++) {
                if (<any>this.mentor[`university_${idx}_name`]) {
                    const _name = this.mentor[`university_${idx}_name`];
                    uniHtml += `<li>${_name}`;
                }
                if (this.mentor[`university_${idx}_program`]) {
                    const _program = this.mentor[`university_${idx}_program`]
                    uniHtml += `, ${_program}`;
                }
                if (this.mentor[`university_${idx}_country`]) {
                    const _country = this.mentor[`university_${idx}_country`]
                    uniHtml += `, ${_country}`;
                }
                if (this.mentor[`university_${idx}_grad_year`]) {
                    const _grad_year = this.mentor[`university_${idx}_grad_year`]
                    uniHtml += `<small>, ${_grad_year}</small>`;
                }
                uniHtml += `</li>\n`;
            }
            uniHtml +=
                `</ul>\n` +
                `</div>`;
        }
        document.getElementById("university").innerHTML = uniHtml;
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
    let tagHtml = "<div>\n";
    let universityPrograms: Array<String> = [];
    let countries: Array<String> = [];
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
    universityPrograms.forEach(program => {
        tagHtml = tagHtml + `<span class="label label-color-a">${<String>program}</span>\n`
    });
    tagHtml = tagHtml + "</div>\n";
    if (mentor.working_industry) {
        tagHtml = tagHtml + `<div>\n <span class="label label-color-b">${<String>mentor.working_industry}</span>\n </div>\n`;
    }
    tagHtml = tagHtml + "<div>\n";
    countries.forEach(country => {
        tagHtml = tagHtml + `<span class="label label-color-c">${<String>country}</span>\n`
    });
    tagHtml = tagHtml + "</div>\n";

    return tagHtml;
}