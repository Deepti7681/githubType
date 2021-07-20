import { create } from "domain";

const post =[{tilte: 'post1',body:'thisis1'},
{tilte: 'post1',body:'thisis1'}];
function getPosts(){
    setTimeout(()=>{
        let output='';
        posts.ForEach((post,index)=>{
            output +=`<li>${post.tilte}</li>`;
        });
        document.doctype.innerHTML=output;

        
    },1000);
}
function createPost(post,callback){
    setTimeout(()=>{
        posts.push(post);
        callback();
    },2000);
}
getPosts();
create({title:'post 3',body:'this is 3'},getPosts);