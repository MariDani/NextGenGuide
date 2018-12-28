export interface MentorDataProperties {
    name: string,
    surname: string,
    keywords: Array<string>,
    places: Array<string>,
    id?: string;
}

type Tag = "keywords" | "places";

export default class MentorData {

    tagList: Array<string>;
    mentorIdList: Array<string>;
    placeList: Array<string>;

    constructor(public jsonData: Array<MentorDataProperties>) {

        this.mentorIdList = new Array();
        this.tagList = new Array();
        this.placeList = new Array();

        jsonData.forEach(mentor => {
            mentor.id = this.createAvailableId(mentor.name, mentor.surname);
            this.updateList(this.tagList, mentor.keywords);
            this.updateList(this.placeList, mentor.places);
        });
    }

    private createAvailableId(name: string, surname: string) {
        let id = `${name.toLowerCase()}${surname.toLowerCase()}`

        let index = 1;
        while (this.mentorIdList.includes(id)) {
            index++;
            id = id.replace(/\d+/g, '') + index;
        }
        this.mentorIdList.push(id)
        return id;
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

    public getMentorByIdx(idx: number) {
        return this.jsonData[idx];
    }

    public getMentorName(idx: number) {
        return `${this.jsonData[idx].name} ${this.jsonData[idx].surname}`;
    }

    public createTags(idx: number, tagGroup: Tag) {
        let tagString = "";
        this.jsonData[idx][tagGroup].forEach(tag => {
            tagString = tagString + `<span class="label label-not-selected">${tag}</span>\n`;
        });
        return "<div>" + tagString + "</div>\n";
    }

    public getMentorIdxFromId(id: string) {
        let index = 0;
        while (this.jsonData[index].id != id && index < this.jsonData.length) {
            index++;
        }
        return index;
    }

}