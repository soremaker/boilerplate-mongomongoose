require("dotenv").config();

let Person;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://liuyi:ly221010@cluster0.0kgky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true },
);
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "app",
    age: 88,
    favoriteFoods: ["apple", "banana"],
  });
  person.save(function (err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] },
];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, people) {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, people) {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, people) {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, people) {
    if (err) {
      done(err);
    } else {
      people.favoriteFoods.push(foodToAdd);
      people.save(function (err, updatedpeople) {
        if (err) {
          done(err);
        } else {
          done(null, updatedpeople);
        }
      });
    }
  });
  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, people) {
      if (err) {
        done(err);
      } else done(null, people);
    },
  );

  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, people) {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, people) {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });

  //done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, people) {
      if (err) {
        done(err);
      } else {
        done(null, people);
      }
    });
  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
