// CODE EXPLAINED channel

const clear=document.querySelector('.clear');
const dateElement=document.getElementById('date');
const list=document.getElementById('list');
const input=document.getElementById('input');
const check='fa-check-circle';
const uncheck='fa-circle-thin';
const linethrough='lineThrough';

let LIST;
let id;
let data=localStorage.setItem("ToDO",JSON.stringify(LIST));

if (data)
{
    LIST=JSON.parse(data)
    id=LIST.length;
    loadlist(LIST)
    
}
else
{
    LIST=[];
    id=0;

}

function loadlist(array) 
{
    array.forEach(item =>
    {
        addToDo(item.name,item.id,item.done,item.trash)
        
    });
    
}

clear.addEventListener('click',()=>
{
    localStorage.clear();
    location.reload()
})

const options={weekday:"long",month:"short",day:"numeric"}
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options)


function addToDo(todo,id,done,trash)
{
    if (trash)
    {
        return;
        
    }
    const Done=done?check:uncheck;
    const Line=done ? linethrough:"";

    const item=`
           <li class="item">
                <i class="fa ${Done} co" id="${id}" job="complete"></i>
                <p class="text ${Line}">${todo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
          </li>
    `
    const pos="beforeend";
    list.insertAdjacentHTML(pos,item)
}
// addToDo('drink')

//add a item
document.addEventListener('keyup',function(event)
{
    if (event.keyCode==13)
    {
        const toDo=input.value;
        //if toDo not empty
        if (toDo)
        {
            addToDo(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false,
            })
            id++;
            
        }
        input.value=""
        
    }
})
// addToDo('cofee',1,false,false)
function completetoDo(elem)
{
    elem.classList.toggle(check);
    elem.classList.toggle(uncheck);
    elem.parentNode.querySelector('.text').classList.toggle(linethrough);

    LIST[elem.id].done=LIST[elem.id].done ? false : true;


}

function removeToDo(elem)
{
   elem.parentNode.parentNode.removeChild(elem.parentNode);
   LIST[elem.id].trash=true;

}


list.addEventListener('click',function(event)
{
    const element=event.target;
    const elementJob=element.attributes.job.value;

    if(elementJob=="complete")
    {
        completetoDo(element)
    }
    else if(elementJob=="delete")
    {
        removeToDo(element)
    }
})