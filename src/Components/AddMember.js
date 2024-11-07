import {useDispatch} from 'react-redux';
import { addMembers } from './MemberSlice';


function AddMember(){
    const dispatch = useDispatch();

    function handleValues(event){
        event.preventDefault();
       const Id = event.target.elements.Id.value;
       const quotes =event.target.elements.quotes.value;
       const author = event.target.elements.author.value;
       const newMember ={
        id: Id,          // Ensure the property name matches what is used in DataList component
            quote: quotes,   // Match the property name with the API data's structure
            author: author,

       }
       dispatch(addMembers(newMember));
       event.target.reset();

    }
    return(
        
        <form className ='addForm bg-teal-400 p-4' onSubmit ={handleValues}>
            <input type="text" name ="Id" placeholder='Enter Id' className="m-4 p-0.5"/>
            <input type="text" name ="quotes" placeholder='Enter quotes' className="m-4 p-0.5"/>
            <input type="text" name ="author" placeholder='Enter author' className="m-4 p-0.5"/>
            <button className="m-4 p-0.5 px-1.5 bg-lime-300 rounded-md ">Add</button>
         </form>
           
    )
    }
export default AddMember;

    
