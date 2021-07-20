import React,{useState} from "react"
function Demo(){
    const [count,setCount]=useState(0);
    return(
        <button onClick={()=>setCount(count+1)}>click</button>
    )
}
export default Demo;