let title="";
const header=document.getElementById('header');
fetch("http://localhost:5000/Reviews/62e1da05f72bb732ac559492").then((response) => response.json())
    .then((posts) => {
        header.innerHTML=`${posts.title}: Write a Review!`;
        title=posts.title;
    }).catch(err=>{
        console.log(err);
    })

//console.log(title);



const form = document.getElementById("form");
const main = document.getElementById("main");


form.addEventListener("submit", async (e)=> {
    e.preventDefault();
    main.innerHTML='<a id="link" href="Movie.html">Read your review</a>'
    const retrieve = await fetch('http://localhost:5000/Reviews', {
        method: "GET",
        

    })
    const post = await retrieve.json();
    
  
    /*post.forEach((movie)=>{
        
        if(movie.title===title)
        {
            results.push(movie);
        }
    })*/
    //console.log(results);
   
    
    let find=post.find((element)=>{
    
        //element.I ===0;
       return element.title===title && element._id!==`62e1da05f72bb732ac559492`;
        //element.title===title;

    
        
    });
    
    //console.log(find);
    const formData = new FormData();
    formData.append('title', title);
    
    if(find!==undefined)
    {
        
            //console.log(find)
            //console.log(find.Review[0])
            //let temp=find.Review;
            //temp.push(e.target.Review.value);
           // console.log(temp);
            //let temp=find.Review;
            //console.log(temp);
            //temp.push(e.target.Review.value);
           // console.log(temp[1]);
            formData.append('Review', e.target.Review.value);
            formData.append('id', find._id);
            console.log(find._id)
            //console.log(temp);
            const update = await fetch('http://localhost:5000/Reviews', {
                method: "PUT",
                body: formData,
                
            }).catch(err => {
                console.log(err);
            });

           

            

            
             
        
        }
        else{
            const data = new FormData();
            data.append('title', title);
            data.append('Review', e.target.Review.value);
            //console.log(data);

            const response = await fetch('http://localhost:5000/Reviews', {
                method: "POST",
                body: data,

            })

            const update = await fetch('http://localhost:5000/Selected', {
                method: "PUT",
                body: data,
        
            }).catch(err => {
                console.log(err);
            });
            
        }
        
        
       
    })
 


    
   
  
  


