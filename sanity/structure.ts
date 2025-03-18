import { StructureBuilder } from "sanity/desk";

export default (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("profile").title("Profile"),
     
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("skills").title("Skills"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
     
      S.documentTypeListItem("navbar").title("Navigation"),
      
      // Dynamically include any other document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "profile",
            
            "project",
            "skills",
            "post",
            "caseStudy",
            
            "navbar",
          ].includes(listItem.getId() || "")
      ),
    ]);
