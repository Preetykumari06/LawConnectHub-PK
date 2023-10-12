//let token = localStorage.getItem("Token");
let main = document.querySelector('#main');
let ID =(localStorage.getItem("userId"));
//console.log(ID)
let url = "http://localhost:4500/apponiment/client";


function fetchData() {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {

       // console.log(data.bookings)

        const filterData=data.bookings.filter((el)=>el.userId===ID)
        console.log(filterData)
        displayDta (filterData)
     
      })
  }
  fetchData();



function displayDta(data){
    main.innerHTML="";
    data.forEach(el => {
        const card=document.createElement('div')
        card.classList.add("card")

        const client=document.createElement("h3");
        client.classList.add("client")
        client.textContent=`Client :${el.client}`;

        const lawyer=document.createElement("h3");
        lawyer.classList.add("lawyer")
        lawyer.textContent=`Lawler :${el.lawyer}`;

        const date=document.createElement("h3");
        date.classList.add("date")
        date.textContent=`Date :${el.date}`;

        const time=document.createElement("h3");
        time.classList.add("time")
        time.textContent=`Time :${el.time}`;

        const join=document.createElement("Button");
        join.classList.add("join")
        join.textContent="Join";


        const cancelbtn=document.createElement("Button");
        cancelbtn.classList.add("cancelbtn")
        cancelbtn.textContent="Cancel";
        cancelbtn.addEventListener("click",()=>Cancel(el._id))

        card.append(client,lawyer,date,time,cancelbtn,join)
        main.append(card)
    });


    

}

function Cancel(id) {
    fetch(`http://localhost:4500/apponiment/cancel/${id}`,{

        method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
     
    }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data (e.g., display it on the page)
          //  displayBlogs(data.data);
          alert("Appointment Cancel ")
         // location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}



//   function appendToDom(name, price, image, bio, _id, gender, email, rating, skills,experience,languages   ) {
    
    // main.innerHTML = `<div class="imagediv">
     
     
    //       </div>
    //       <div class="productdetails">
    //   <h3>Name: ${client}</h3>
    //   <h3>Bio: ${lawyer}</h3>
    //   <h3>Email:${date} </h3>
    //   <p>Rating: ${time}</p>
      
    //   <button id="BookAppintment">Book Appintment</button>
   
    //   </div>`
    

//       // document.getElementById("BookAppintment").addEventListener("click",()=>{
//       //   // console.log("hello")
//       //   window.location.href("../html/Appointment.html")
        
//       // })
   
    
// }

// document.getElementById("BookAppintment").addEventListener("click",()=>{
//   window.location.href("../html/Appointment.html")

// })




