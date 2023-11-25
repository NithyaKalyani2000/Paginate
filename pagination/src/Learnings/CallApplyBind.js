import React, { useEffect } from "react";

function CallApplyBind() {

let object1 = {
    name:"nithya",
    age:23,
    print_Detail: function(){
        console.log("print_Detail",this.name,this.age)
    }
}
object1.print_Detail.bind({
    name:"kalyani",
    age:23})
    
}
export default CallApplyBind;

// Summary
// In call & apply methods, function is directly invoked.
// In bind method , doesnot directly invokes the method but it returns a copy of the method,which can be invoked later.