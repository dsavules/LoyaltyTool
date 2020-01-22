           var club;

            function writeClubs(i) {

                // object template
                // used to push data and to create SVG with Treant.js

                 club = {
                    chart: {
                        container: "#container"
                        ,connectors: {type: "curve"}
                        ,node: {collapsable: true}
                        ,scrollbar: "fancy"
                        ,rootOrientation: "WEST"
                        ,nodeAlign: "BOTTOM"
                        ,levelSeparation:90
                        // ,subTreeSeparation: 150
                        ,siblingSeparation:20
                    },
                    nodeStructure: {
                        text: { name: "Club" },
                        children: [
                            {
                                text: { name: "Groups" },
                                collapsed: true,
                                children: []
                            },
                            {
                                text: { name: "Club Recognitions" },
                                collapsed: false,
                                children: []
                            }                        ]
                    }
                };

                club.chart.container = "#clubId"+i;

                var treant_container = document.createElement("div");
                treant_container.setAttribute("id", "clubId" + i);
                document.getElementById("container").appendChild(treant_container);

                temp = { name: treedataobj.clubs[i].club_name, 
                        data: treedataobj.clubs[i].club_id };

                club.nodeStructure.text = temp;
            }

            function writeClubRecognitions(i,j){
                // collapse if club recogs exist
                club.nodeStructure.children[1].collapsed = true
                temp = {text: {name: treedataobj.clubs[i].club_recognitions[j].recognition_name, 
                                data: treedataobj.clubs[i].club_recognitions[j].recognition_id}, children: []};

                club.nodeStructure.children[1].children.push(temp);
            }

            function writeClubRecognitionRule(i,j) {
                // collapse the club recog since rule exists
                club.nodeStructure.children[1].children[j].collapsed = true;
                
                temp = {text: {name: "Rule"}, collapsed: true, children: []}
                        club.nodeStructure.children[1].children[j].children.push(temp);

                temp = {text: {name: treedataobj.clubs[i].club_recognitions[j].rule[0].rule_name,
                                data: treedataobj.clubs[i].club_recognitions[j].rule[0].rule_id}};

                club.nodeStructure.children[1].children[j].children[0].children.push(temp);
            }

            function writeGroups(i,j) {

                temp = {
                        text: {name: treedataobj.clubs[i].groups[j].group_name,
                                data: treedataobj.clubs[i].groups[j].group_id},
                        collapsed: true,
                        children: [{text: {name: "Parent Group"}, collapsed: false, children: []},
                                    {text: {name: "Rules"}, collapsed: false, children: []},
                                    {text: {name: "Level"}, collapsed: false, children: []},
                                    {text: {name: "Recognitions"}, collapsed: false, children: []},
                                    {text: {name: "Model"}, collapsed: false, children: []}
                                    ]
                    }

                club.nodeStructure.children[0].children.push(temp); // club -> groups
            }

            function writeParentGroup(i,j) {

                club.nodeStructure.children[0].children[j].children[0].collapsed = true; // collapse since parent group exists

                temp = {text: {name: treedataobj.clubs[i].groups[j].parent_group[0].group_name,
                                data: treedataobj.clubs[i].groups[j].parent_group[0].group_id}};

                club.nodeStructure.children[0].children[j].children[0].children.push(temp); // club -> group -> parent group
            }

            function writeGroupRule(i,j) {

                club.nodeStructure.children[0].children[j].children[1].collapsed = true; // collapse since rule exists

                temp = {text: {name: treedataobj.clubs[i].groups[j].rules[k].rule_name,
                                data: treedataobj.clubs[i].groups[j].rules[k].rule_id}};

                club.nodeStructure.children[0].children[j].children[1].children.push(temp); // club -> group -> rule

            }

            function writeGroupLevel(i,j) {                

                club.nodeStructure.children[0].children[j].children[2].collapsed = true; // collapse since level exists

                temp = {text: {name: treedataobj.clubs[i].groups[j].levels[0].level_name,
                                data: treedataobj.clubs[i].groups[j].levels[0].level_id}};

                club.nodeStructure.children[0].children[j].children[2].children.push(temp); // club -> group -> parent group
            }

            function writeRecognitions(i,j,k) {

                club.nodeStructure.children[0].children[j].children[3].collapsed = true; // collapse since recognitions exist

                temp = {text: {name: treedataobj.clubs[i].groups[j].recognitions[k].recognition_name,
                                data: treedataobj.clubs[i].groups[j].recognitions[k].recognition_id}, collapsed: false, children: []}

                club.nodeStructure.children[0].children[j].children[3].children.push(temp); // club -> group -> recognition
            }

            function writeRecognitionLevel(i,j,k) {

                club.nodeStructure.children[0].children[j].children[3].children[k].collapsed = true; // collapse since recognitions exist

                // create class node and collapse since level exists
                temp = {text: {name: "Level"}, collapsed: true, children: []}
                club.nodeStructure.children[0].children[j].children[3].children[k].children.push(temp); // club -> group -> recognition

                temp = {text: {name: treedataobj.clubs[i].groups[j].recognitions[k].levels[0].level_name,
                                data: treedataobj.clubs[i].groups[j].recognitions[k].levels[0].level_id}}

                club.nodeStructure.children[0].children[j].children[3].children[k].children[0].children.push(temp); // club -> group -> recognition -> level
            }

            function writeGroupModel(i,j) {

                club.nodeStructure.children[0].children[j].children[4].collapsed = true; // collapse since model exists

                // create class node and collapse since rules exist
                temp = {text: {name: treedataobj.clubs[i].groups[j].models[0].model_name,
                                data: treedataobj.clubs[i].groups[j].models[0].model_id}, collapsed: false, 
                                children: [{text: {name: "Rules"}, collapsed: true, children:[]}]}

                club.nodeStructure.children[0].children[j].children[4].children.push(temp); // club -> group -> model
            }

            function writeGroupModelRules  (i,j) {

                club.nodeStructure.children[0].children[j].children[4].children[0].collapsed = true;

                temp = {text: {name: treedataobj.clubs[i].groups[j].models[0].model_rules[k].rule_name,
                                data: treedataobj.clubs[i].groups[j].models[0].model_rules[k].modelRule_ruleid}}

                club.nodeStructure.children[0].children[j].children[4].children[0].children[0].children.push(temp); // club -> group -> model -> rules
            }