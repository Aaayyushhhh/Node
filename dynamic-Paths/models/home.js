// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

  const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName || "Untitled Home";
    this.price = price !== undefined && price !== "" ? Number(price) : 0;
    this.location = location || "Unknown";
    this.rating = rating !== undefined && rating !== "" ? Number(rating) : 0;
    this.photoUrl = photoUrl || "";
  }


  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) { // edit home case for which that would be present
        registeredHomes = registeredHomes.map(home => 
          home.id === this.id ? this : home);
      } else { // add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId,callback){
    this.fetchAll(homes =>{
      const homeFOUND = homes.find(home => home.id === homeId);
      callback(homeFOUND);
     });
    }

static deleteById (homeId, callback){
  this.fetchAll(homes =>{
    homes = homes.filter(home => home.id !== homeId);
     fs.writeFile(homeDataPath, JSON.stringify(homes), callback);
  });
}
};