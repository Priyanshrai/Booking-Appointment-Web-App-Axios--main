function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phonenumber = event.target.phonenumber.value;
  
  const obj = {
      name,
      email,
      phonenumber
  }
  // axios.post("http://localhost:3000/user/add-user",
  //   obj)
  // .then(function (response) {
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  axios.post("http://localhost:3000/user/add-user", obj)
  .then((res) => {
    console.log(res);
    // Assuming that "showUser" is a function that displays user details on the screen
    showNewUserOnScreen(res.data.newUserDetail);
    // Assuming that "showNewUserOnScreen" is a function that adds a new user to the screen
    showNewUserOnScreen(obj);
  })
  .catch((err) => {
    console.error("Error adding user:", err);
    // Assuming that there is some sort of error message displayed on the screen
    showErrorOnScreen("Failed to add user. Please try again later.");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/user/get-users")
  .then((response)=>{
    
    for(i=0;i<response.data.allUsers.length;i++){
      showNewUserOnScreen(response.data.allUsers[i])
    }
  })
  .catch((err)=>{
    console.log(err)
  })
  
 
  // const localStorageObj = localStorage;
  // const localstoragekeys  = Object.keys(localStorageObj)
  
  // for(var i =0; i< localstoragekeys.length; i++){  
  //     const key = localstoragekeys[i] ;
  //     const userDetailsString = localStorageObj[key];
  //     const userDetailsObj = JSON.parse(userDetailsString);
  //     showNewUserOnScreen(userDetailsObj)
  // }
})

function showNewUserOnScreen(user){
 
const parentNode = document.getElementById('listOfUsers');
const userId=user.id;

  const childHTML = `<li id=${user.id}> ${user.name} - ${user.email}    
                          <button onclick=deleteUser('${user.id}')> Delete User </button>
                          <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user. id}')>Edit User </button>
                       </li>` //esa likha aayga

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
// edit User

function editUserDetails(emailId, name, phonenumber, userId){

  document.getElementById('email').value = emailId;
  document.getElementById('username').value = name;
  document.getElementById('phonenumber').value =phonenumber;
  

  deleteUser(userId)
}

// deleteUser('abc@gmail.com')

function deleteUser(userId){
 
  axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
  .then((res)=>{
    removeUserFromScreen(userId);
  })
  .catch((err)=>{
    console.log(err)
  })

  // localStorage.removeItem(emailId);
  // removeUserFromScreen(emailId);

}

function removeUserFromScreen(emailId){
  const parentNode = document.getElementById('listOfUsers');
  const childNodeToBeDeleted = document.getElementById(emailId);

  parentNode.removeChild(childNodeToBeDeleted)
}
