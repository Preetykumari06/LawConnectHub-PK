let token = localStorage.getItem("token");
let main = document.querySelector('.indi');
let ID =(localStorage.getItem("product"));
console.log(ID)
let url = "http://localhost:4500/getLawyer";


function fetchData() {
    fetch(`${url}/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        appendToDom(data.name, data.price, data.image, data.bio, data._id, data.email, data.gender, data.rating, data.skills,data.experience,data.languages )
      })
  }
  fetchData();
  function appendToDom(name, price, image, bio, id, gender, email, rating, skills,experience,languages   ) {
    
    main.innerHTML = `<div class="imagediv">
     
      <img src="${image}" alt="${name}"/>
          </div>
          <div class="productdetails">
      <h3>Name: ${name}</h3>
      <h3>Bio: ${bio}</h3>
      <h3>Email:${gender} </h3>
      <p>Rating: ${rating}</p>
      <p id="priice">Price: ₹${price}</p>
      <p id="experience">Experience: ${experience}</p>
      <p id="skills">Skills: ${skills.join(" ")}</p>
      <p id="skills">Languages: ${languages.join(" ")}</p>
      <button id="BookAppintment">Book Appintment</button>
   
      </div>`

   
}

document.getElementById("BookAppintment").addEventListener(()=>{
  window.location.href("../html/Appointment.html")

})


