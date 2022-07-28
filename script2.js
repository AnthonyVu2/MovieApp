

//gets reviews from server and adds it to HTML
fetch("http://localhost:5000/Reviews/62e1da05f72bb732ac559492").then((response) => response.json())
    .then((posts) => {
        //console.log(posts)
        const title=document.getElementById("header2");
        let reviews=[];
        let collection=""
        if(posts.Review.length!==0)
        {
            reviews=posts.Review;
        }
        
        title.innerHTML=`
        <div>
        
            ${posts.title}
            <a id="submit" href="submit.html">Submit a Review</a>
        
        
        </div>
        <div>
            <a href="App.html" style="color: white;">Return to Homepage</a>
        </div>`;
        if(reviews.length===0)
        {
            
            collection = `
        <div class="reviews">
            <h4>
                No Reviews Yet. Be the first to leave one
            </h4>
        </div>`;
        main.innerHTML=
        `<div class="flex-container">
            ${collection}
        </div>`;
        }
        else{
        reviews.forEach(review => {
            
            collection += `
        <div class="reviews">
            <h4>
                "${review}"
            </h4>
            
        </div>`;
        main.innerHTML=
        `<div class="flex-container">
            ${collection}
        </div>`;
        })
         
        }
        
        
}).catch(err => {
    console.log(err)
});


const Post = (post) => {
    return `<div class="preview">
    <div>
        <h1>${post.Review}</h1>
        
       
        
    </div>
`;
};


