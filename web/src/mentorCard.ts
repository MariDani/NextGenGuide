interface MentorData {
    name: string,
    surname: string,
    tags: Array<string>
}

export default class MentorCard {

    constructor(public data: Array<MentorData>, id: string) {

        const mentorsDiv = document.getElementById(id);

        data.forEach((mentor, mentorIdx) => {
            let cardDiv = document.createElement("div");
            cardDiv.innerHTML = this.createInnerHtml(mentor, mentorIdx);
            mentorsDiv.appendChild(cardDiv);
        });

    }

    private createInnerHtml(mentor: MentorData, mentorIdx: number) {
        return `<div class="cell" id="mentor-${mentorIdx}">\n` +
            '<div class="card mentor-card">\n' +
            '<img src="img/dummy-profile-image.jpg">\n' +
            '<div class="card-section">\n' +
            `<h4>${mentor.name} ${mentor.surname}</h4>\n` +
            '<p>It has an easy to override visual style, and is appropriately subdued.</p>\n' +
            this.createTags(mentor) +
            '</div>\n' +
            '</div>\n' +
            '</div>\n';
    }

    private createTags(mentor: MentorData) {
        let tagString = "";
        mentor.tags.forEach(tag => {
            tagString = tagString + `<span class="label secondary">${tag}</span>\n`
        });
        return tagString;
    }


    public filterByTags(tagsArray: Array<string>) {
        if (tagsArray[0] != ""){
            this.data.forEach((mentor, mentorIdx) => {

                let labels = document.getElementById(`mentor-${mentorIdx}`).getElementsByClassName("label");
                for (let label of labels) {
                    label.className = "label secondary"
                }
    
                let searchSuccess = false;
                tagsArray.forEach(searchTag => {
    
                    if (mentor.tags.indexOf(searchTag) > -1) {
                        searchSuccess = true;
    
                        for (let label of labels) {
                            if (label.innerHTML === searchTag) {
                                label.className = "label primary"
                            }
                        }
                    }
    
                    if (searchSuccess) {
                        document.getElementById(`mentor-${mentorIdx}`).style.display = "block";
                    }
                    else document.getElementById(`mentor-${mentorIdx}`).style.display = "none";
                });
            });
            
        }
        else {
            this.data.forEach((mentor, mentorIdx) => {
                document.getElementById(`mentor-${mentorIdx}`).style.display = "block";
            })
        }

    }
}