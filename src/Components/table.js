
import React ,{useState,useEffect} from 'react';
import AddMember from './AddMember';
import {useSelector,useDispatch} from 'react-redux';
import {setMembers} from './MemberSlice';
import * as XLSX from 'xlsx';


function DataList(){
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.members.memberList);

    const [currentPage,setCurrentPage] =useState(1);
    const itemsPerPage = 10;

    const [sortconfig ,setSortConfig]=useState({key :"id",direction:"ascending"});

    const [searchTerm ,setSearchTerm] = useState('');
    
    
    const sortedList = [...memberList].sort((a, b) => {
        if (a[sortconfig.key] < b[sortconfig.key]) {
            return sortconfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortconfig.key] > b[sortconfig.key]) {
            return sortconfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredList =sortedList.filter(item =>
        item.quote.toLowerCase().includes(searchTerm.toLowerCase())||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())||
        item.id.toString().includes(searchTerm)
    )

    useEffect(()=>{
        fetch('https://dummyjson.com/quotes')
        .then(response => response.json())
        .then(result =>dispatch(setMembers(result.quotes)))
        .catch(error =>console.log(error));

    },[dispatch])


    const lastItemIndex = currentPage *itemsPerPage;
    const firstItemIndex =lastItemIndex - itemsPerPage;
    const currentItems =filteredList.slice(firstItemIndex,lastItemIndex );

    const totalPages = Math.ceil(filteredList.length/itemsPerPage);
    

    const handlePageChange =(newPage)=>{
        if(newPage > 0 && newPage <= totalPages){
            setCurrentPage(newPage);
        }
    }

    const handleSort =(columnKey)=>{
        setSortConfig((prevConfig)=>{
            const newConfig =
            prevConfig.key === columnKey && prevConfig.direction ==='ascending' ? 'descending' :'ascending';
             return {key : columnKey , direction : newConfig};
        }
    );
    }

    const downloadExcel = ()=>{
        const dataToDownload = filteredList.map(member =>({
            Id : member.id,
            Quote : member.quote,
            Author :member.author
        }));
        const workSheet = XLSX.utils.json_to_sheet(dataToDownload);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook,workSheet,"Members");
        XLSX.writeFile(workBook,"members.xlsx"); 
    }
    return (
    <div className ='tableWrap'>
       <AddMember  />
     
       <input className='border-2 border-neutral-700 m-4 p-1 rounded-md' type='text' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>

        <table className="table-fixed border-collapse border w-full">
            <thead>
            <tr className=''>
                <th className=" border-2 border-neutral-400 p-1.5 text-center" onClick ={()=>handleSort('id')}>
                   Id {sortconfig.key ==='id' ? (sortconfig.direction === 'ascending' ? '▲':'▼'):''}
                </th>
                <th className="border-2 border-neutral-400 p-1.5 text-center" onClick ={()=>handleSort('quote') }>
                    Quotes {sortconfig.key ==='quote' ? (sortconfig.direction === 'ascending' ? '▲':'▼'):''}
                </th>
                <th className="border-2 border-neutral-400 p-1.5 text-center" onClick ={()=>handleSort('author')}>
                     Author {sortconfig.key ==='author' ? (sortconfig.direction === 'ascending' ? '▲':'▼'):''}
                </th>
                
            </tr>
            </thead>
            <tbody>
            {
                currentItems.length > 0 ?
                currentItems.map (usr =>(
                    <tr key={usr.id}>
                        
                        <td className="border p-2 text-center text-lg sm:text-base">{usr.id}</td>
                        <td className="border p-2 text-center text-lg sm:text-base">{usr.quote}</td>
                        <td className="border p-2 text-center">{usr.author}</td>
                        
                    </tr>
                ))
                :"Loading"
            } 
            </tbody>
        </table>
    

    <div className = "pagination my-4  ">
        <button className='bg-gray-200 p-1 px-1 m-1 rounded-md' onClick ={()=>handlePageChange(currentPage-1)} disabled ={currentPage ===1}>
            Previous
        </button>
        <span> {currentPage} of {totalPages} </span>
        <button  className='bg-gray-200 p-1 px-1 m-1 rounded-md' onClick ={()=>handlePageChange(currentPage+1)} disabled={currentPage ===totalPages}>
            Next
        </button>

        <div className="Download">
            <button className='bg-green-400 p-1 m-4 px-2 rounded-md' onClick={downloadExcel} >Download as Excel</button>
        </div>


    </div>
    
</div>

        );}


 export default DataList;
 