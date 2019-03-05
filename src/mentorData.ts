import { json } from "body-parser";

// based on exact db structure
export interface MentorDataProperties {
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

// type Tag = "keywords" | "places";

export default class MentorData {

    tagList: Array<string>;

    constructor(public jsonData: Array<MentorDataProperties>) {
        // this.tagList = new Array();

        // jsonData.forEach(mentor => {
        //     this.tagList = [mentor.role, mentor.country];
        //     console.log()
        //     // this.updateList(this.tagList, );
        // });
    }

    private updateList(list: Array<string>, elements: Array<string>) {
        elements.forEach(element => {
            if (list.indexOf(element) === -1) {
                list.push(element);
            }
        });
    }

    public getData() {
        return this.jsonData;
    }

    public getMentorById(id: number) {
        let idx = 0;
        while (idx < this.jsonData.length && this.jsonData[idx].id !== id) {
            idx++;
        }
        return this.jsonData[idx];
    }

    public getMentorName(mentor: MentorDataProperties) {
        return `${mentor.first_name} ${mentor.last_name}`;
    }

    public createTags(mentor: MentorDataProperties) {
        let tagString = "";
        [mentor.role, mentor.company].forEach((tag, i) => {
            tagString = tagString + `<span class="label ${i > 0 ? "label-not-selected" : "label-selected"}">${tag}</span>\n`;
        });

        return "<div>" + tagString + "</div>\n";
    }

    public getCurrentRole(mentor: MentorDataProperties) {
        let htmlString = "";
        if (mentor.role) {
            htmlString += `<h7 class="subheader"><small>Current role</small></h7>\n` +
                `<div class="large-offset-2 medium-offset-2">\n` +
                `<ul class="no-bullet">\n`;

            htmlString += `<li>${mentor.role}</li>\n`;
            if (mentor.working_industry) htmlString += `<li>${mentor.working_industry}</li>\n`;
            if (mentor.company) {
                if (mentor.country) htmlString += `<li>${mentor.company}, ${mentor.country}</li>\n`;
                else `<li>${mentor.company}</li>\n`;
            }

            htmlString +=
                `</ul>\n` +
                `</div>`;
        }
        return htmlString;
    }

    public getPreviousRole(mentor: MentorDataProperties) {

        let htmlString = "";
        if (mentor.previous_role) {
            htmlString += `<h7 class="subheader"><small>Previous role</small></h7>\n` +
                `<div class="large-offset-2 medium-offset-2">\n` +
                `<ul class="no-bullet">\n`;

            htmlString += `<li>${mentor.previous_role}`;
            if (mentor.previous_company) htmlString += `, ${mentor.previous_company}`;
            if (mentor.previous_country) htmlString += `, ${mentor.previous_country}`;
            htmlString += `</li>\n`;

            htmlString +=
                `</ul>\n` +
                `</div>`;
        }

        return htmlString;
    }

    public getHighSchool(mentor: MentorDataProperties) {
        let htmlString = "";
        if (mentor.high_school_name || mentor.high_school_abroad) {
            htmlString +=
                `<h7 class="subheader"><small>High school education</small></h7>\n` +
                `<div class="large-offset-1 medium-offset-1">\n` +
                `<ul class="no-bullet">\n`;

            if (mentor.high_school_name) {
                htmlString += `<li>${mentor.high_school_name}`;
                if (mentor.maturita_year) htmlString += `<small>, graduated ${mentor.maturita_year}</small>`;
                htmlString += `</li>\n`;
            }
            if (mentor.high_school_abroad) {
                htmlString += `<li>${mentor.high_school_abroad}`;
                if (mentor.high_school_abroad_country) htmlString += `, ${mentor.high_school_abroad_country}`;
                htmlString += `</li>\n`;
            }

            htmlString +=
                `</ul>\n` +
                `</div>`;
        }

        return htmlString;
    }

    public getUniversity(mentor: MentorDataProperties) {
        let htmlString = "";
        if (mentor.university_1_name || mentor.university_2_name || mentor.university_3_name) {

            htmlString += `<h7 class="subheader"><small>University education</small></h7>\n` +
                `<div class="large-offset-1 medium-offset-1">\n` +
                `<ul class="no-bullet">\n`;

            if (mentor.university_1_name) {
                htmlString += `<li>${mentor.university_1_name}`;
                if (mentor.university_1_program) htmlString += `, ${mentor.university_1_program}`;
                if (mentor.university_1_country) htmlString += `, ${mentor.university_1_country}`;
                if (mentor.university_1_grad_year) htmlString += `<small>, graduated ${mentor.university_1_grad_year}</small>`;
                htmlString += `</li>\n`;
            }

            if (mentor.university_2_name) {
                htmlString += `<li>${mentor.university_2_name}`;
                if (mentor.university_2_program) htmlString += `, ${mentor.university_2_program}`;
                if (mentor.university_2_country) htmlString += `, ${mentor.university_2_country}`;
                if (mentor.university_2_grad_year) htmlString += `<small>, graduated ${mentor.university_2_grad_year}</small>`;
                htmlString += `</li>\n`;
            }
            if (mentor.university_3_name) {
                htmlString += `<li>${mentor.university_3_name}`;
                if (mentor.university_3_program) htmlString += `, ${mentor.university_3_program}`;
                if (mentor.university_3_country) htmlString += `, ${mentor.university_3_country}`;
                if (mentor.university_3_grad_year) htmlString += `<small>, graduated ${mentor.university_3_grad_year}</small>`;
                htmlString += `</li>\n`;
            }
            htmlString +=
                `</ul>\n` +
                `</div>`;
        }
        return htmlString;
    }

    public getDescription(mentor: MentorDataProperties) {
        let htmlString = "";
        if (mentor.description) {
            htmlString =
                `<h7 class="subheader"><small>Description</small></h7>\n` +
                `<div class="large-offset-1 medium-offset-1">\n`

            htmlString += `<p>${mentor.description}</p>`;

            htmlString +=
                `</div>`;

        }
        return htmlString;
    }
}