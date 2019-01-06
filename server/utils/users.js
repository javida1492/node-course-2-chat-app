[{
  id: "/#1poiajdspfoif",
  name: "Andrew",
  room: "The Office Fans"
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users{
  constructor(){
    this.users = [];
  }
  //-----------------------------//
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  //-----------------------------//
  removeUser(id){
    //return user that was removed
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  //-----------------------------//
  getUser(id){
    //return user
    return this.users.filter((user) => user.id === id)[0];
  }
  //-----------------------------//
  getUserList(room){
    //return users who are in room
    var users = this.users.filter((user) => user.room === room);
    var namesArr = users.map((user) => user.name);
    return namesArr;
  }

}

module.exports = {Users};
