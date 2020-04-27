exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("classes")
      .then(function() {
        // Inserts seed entries
        return knex("classes").insert([
          {
          
            name: "Hot Yoga",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 1,
            imgUrl:1
          },
          {
            
            name: "Boxing",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 2,
            imgUrl:1
          },
          {
           
            name: "Pilates",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 1,
            imgUrl:1
          },
          {
            
            name: "Lifting",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 2,
            imgUrl:1
          }
        ]);
      });
  };