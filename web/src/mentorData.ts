export interface MentorDataProperties {
    name: string,
    surname: string,
    tags: Array<string>,
    id?: string;
}


export default class MentorData {

    tagList: Array<string>;
    mentorIdList: Array<string>;

    constructor(public jsonData: Array<MentorDataProperties>) {

        this.mentorIdList = new Array();
        this.tagList = new Array();

        jsonData.forEach(mentor => {
            mentor.id = this.createAvailableId(mentor.name, mentor.surname);
            this.updateTagList(mentor.tags);
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

    private updateTagList(tags: Array<string>) { 
        tags.forEach(tag => {
            if (this.tagList.indexOf(tag) === -1) {
                this.tagList.push(tag);
            }  
        });
    }

    public getData() {
        return this.jsonData;
    }

    public getMentorByIdx(idx: number) {
        return this.jsonData[idx];
    }

    public getMentorName(idx: number){
        return `${this.jsonData[idx].name} ${this.jsonData[idx].surname}`;
    }

    public createTags(idx: number) {
        let tagString = "";
        this.jsonData[idx].tags.forEach(tag => {
            tagString = tagString + `<span class="label secondary">${tag}</span>\n`;
        });
        return tagString;
    }

    public getMentorIdxFromId(id: string){
        let index = 0;
        while (this.jsonData[index].id != id && index < this.jsonData.length){
            index++;
        }
       return index;
    }

}