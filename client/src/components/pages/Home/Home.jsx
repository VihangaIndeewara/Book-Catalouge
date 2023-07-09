import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import '../Home/Home.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Login from '../login/Login';




export const Home=()=>{
  

//form input
const [bookId,setBookId]=useState("");
const [bookTitle,setBookTitle]=useState("");
const [bookAuthor,setBookAuthor]=useState("");
const [bookLanguage,setBookLanguage]=useState("");
const [bookPrice,setBookPrice]=useState("");

const saveBook=()=>{
  axios.post('http://localhost:5000/api/savebook',
  {bookId:bookId,bookTitle:bookTitle,bookAuthor:bookAuthor,bookLanguage:bookLanguage,bookPrice:bookPrice})
  .then((res)=>alert(res.data.message))
  .catch((err)=>alert(err.data.message))

  loadData();
  clearInputData()
}

const updateBook=()=>{
  axios.put('http://localhost:5000/api/updatebook',
  {bookId:bookId,bookTitle:bookTitle,bookAuthor:bookAuthor,bookLanguage:bookLanguage,bookPrice:bookPrice})
  .then((res)=>alert(res.data.message),  loadData())
  .catch((err)=>alert(err.data.message))


  clearInputData()
}

const deleteBook=()=>{
  axios.post('http://localhost:5000/api/deletebook',{bookId:bookId})
  .then((res)=>alert(res.data.message))
  .catch((err)=>alert(err.data.message))

  loadData();
  clearInputData()
}

//clear input data values
const clearInputData=()=>{
  setBookId("");
  setBookTitle("");
  setBookAuthor("");
  setBookLanguage("");
  setBookPrice("");
}


//set table row values to input field

const handleTableClick = (row) => {
    setBookId(row.bId);
    setBookTitle(row.title);
    setBookAuthor(row.author);
    setBookLanguage(row.language);
    setBookPrice(row.price);
}


//Table Load
    useEffect(()=>{
     loadData();
 
    },[])

    const [data,setData]=useState([]);

    const loadData=()=>{
      fetch('http://localhost:5000/api/get')
      .then(res=>res.json())
      .then(data=>setData(data))
      .catch(err=>console.log(err))
    }
  
    // useEffect(()=>{
    //   fetch('http://localhost:5000/api/get')
    //   .then(res=>res.json())
    //   .then(data=>setData(data))
    //   .catch(err=>console.log(err))
    // },[])
  
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
  

    return(
       <div>
        <Header>
        <Link to={'/login'}>
          <button className="btnLogout" type="button"  >Log Out</button>
        </Link>
        </Header>
        <div className="homeDiv">
           <img id="bookBackImg" src="../assets/images/bookBackground.jpg" alt="bookBackground" />
        </div>
        <form id="inputForm">
            <br/>
            <div className="divFirst">
                <div className="divFirstChild">
                    <label className="name" htmlFor='bookId'>Book Id</label>
                    <br />
                    <input type="text" id='bookId' name='bookId' value={bookId} onChange={(e)=>{setBookId(e.target.value)}}/>
                </div>

                <div className="divFirstChild">
                    <label className="name" htmlFor='bookTitle'>Title</label>
                    <br />
                    <input type="text" id='bookTitle' name='bookTitle' value={bookTitle} onChange={(e)=>{setBookTitle(e.target.value)}} />
                </div>

                <div className="divFirstChild">
                    <label className="name" htmlFor='bookAuthor'>Author</label>
                    <br />
                    <input type="text" id='bookAuthor'name='bookAuthor' value={bookAuthor} onChange={(e)=>{setBookAuthor(e.target.value)}}/>
                </div>

           </div>
           <br/>

           <div className="divFirst">
                <div className="divSecondChild">
                   <label className="name" htmlFor='bookLanguage'>Language</label>
                    <br />
                    <input type="text" id='bookLanguage' name='bookLanguage' value={bookLanguage} onChange={(e)=>{setBookLanguage(e.target.value)}}/>
                </div>

                <div className="divSecondChild">
                    <label className="name" htmlFor='bookPrice'>Price</label>
                    <br />
                    <input type="text" id='bookPrice' name='bookPrice' value={bookPrice} onChange={(e)=>{setBookPrice(e.target.value)}}/>
                </div>
            </div>    

            <br/>
            <br/>

            <div id="btnGroup">
                <button id="btnSave" type="button" onClick={saveBook}>Save</button>
           
                <button id="btnUpdate" type="button" onClick={updateBook}>Update</button>
            
                <button id="btnDelete" type="button" onClick={deleteBook}>Delete</button>
            </div>
           </form>
           <br/>

        <div id ="table">
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Book ID</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Author</StyledTableCell>
            <StyledTableCell align="center">Language</StyledTableCell>
            <StyledTableCell align="center">price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item,i) => (
            <StyledTableRow key={i} onClick={() => handleTableClick(item)}>
              <StyledTableCell align="center" component="th" scope="row">{item.bId}</StyledTableCell>
              <StyledTableCell align="center">{item.title}</StyledTableCell>
              <StyledTableCell align="center">{item.author}</StyledTableCell>
              <StyledTableCell align="center">{item.language}</StyledTableCell>
              <StyledTableCell align="center">{item.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
       
       <Footer/>
       </div>
    );
}