import {MentorDataProperties} from "./mentorData";

export default class MentorCard {
    data: Array<MentorDataProperties>;

    constructor(id: string, private test: any) {
        
        this.data = test.getData();

        const mentorsDiv = document.getElementById(id);

        this.data.forEach((mentor, mentorIdx) => {
            let cardDiv = document.createElement("div");
            cardDiv.className = "cell large-3 medium-4";
            cardDiv.id = `mentor-${mentorIdx}`;
            cardDiv.innerHTML = this.createInnerHtml(mentor, mentorIdx);
            mentorsDiv.appendChild(cardDiv);
        });

    }

    private createInnerHtml(mentor: MentorDataProperties, mentorIdx: number) {
        return `<a href="mentors.html?${mentor.id}">\n` +
            '<div class="card mentor-card">\n' +
            '<img src="img/dummy-profile-image.jpg" class="img-circle float-center">\n' +
            '<div class="card-section">\n' +
            `<h4 class="text-center">${mentor.name} ${mentor.surname}</h4>\n` +
            '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam dui sem, fermentum vitae, sagittis id,malesuada in, quam.</p>\n' +
            this.test.createTags(mentorIdx) +
            '</div>\n' +
            '</div>\n' +
            '</a>\n';
    }


    public filterByTags(tagsArray: Array<string>) {
        if (tagsArray[0] != "") {
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