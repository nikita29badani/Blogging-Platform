import express from "express";
import bodyparser from "body-parser"
import ejs from "ejs";

var posts=[];
const app=express();
const port=3000;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/create",(req, res)=>{
    res.render("create.ejs")
})

app.post("/publish",(req, res)=>{
    var post={
        //id: Date.now().toString(),
        ptitle:req.body["title"],
        pbody:req.body["body"],
        pauthor:req.body["author"]
    }
    posts.push(post);
    res.redirect("/view")       
})

app.get("/view",(req, res)=>{
    res.render("view.ejs", {postk:posts})
    //console.log(posts)       
})

app.post("/delete/:index",(req,res)=>{
    var id=req.params.index;
    posts.splice(id, 1);
    res.redirect("/view");
})

app.get("/edit/:index",(req,res)=>{
    var id=req.params.index;
    var post=posts[id]
    res.render("edit.ejs",{
        post: post,
        index:id
    })
})

app.post("/edit/:index",(req,res)=>{
    var index= req.params.index;
    posts[index]={
        ptitle: req.body["title"],
        pbody: req.body["body"],
        pauthor: req.body["author"]
    }
    res.redirect("/view");
})

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})