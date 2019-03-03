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
    image_url: string
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
        while (idx < this.jsonData.length && this.jsonData[idx].id !== id){
            idx++;
        }
        return this.jsonData[idx];
    }

    public getMentorName(mentor: MentorDataProperties) {
        return `${mentor.first_name} ${mentor.last_name}`;
    }

    public createTags(mentor: MentorDataProperties) {
        let tagString = "";
        [mentor.role, mentor.country].forEach(tag => {
            tagString = tagString + `<span class="label label-not-selected">${tag}</span>\n`;
        });
        
        return "<div>" + tagString + "</div>\n";
    }

    public getCurrentRole(mentor: MentorDataProperties) {
        let currentRoleString = 
        `<h7 class="subheader"><small>Current role</small></h7>\n` +
            `<div class="large-offset-2 medium-offset-2">\n` +
              `<ul class="no-bullet">\n`;
        
        if (mentor.role) currentRoleString += `<li>${mentor.role}</li>\n`;
        if (mentor.working_industry) currentRoleString += `<li>${mentor.working_industry}</li>\n`;
        if (mentor.company) {
            if (mentor.country) currentRoleString += `<li>${mentor.company}, ${mentor.country}</li>\n`;
            else `<li>${mentor.company}</li>\n`
        }

        currentRoleString += 
                `</ul>\n` +
                `</div>`
        return currentRoleString
    }

}