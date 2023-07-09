const express=require("express");
const app=express();
const mysql=require("mysql2");
const cors=require("cors");

const PORT=5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"bookcatalouge"
});

app.post("/api/login",(req,res)=>{
    const sql='SELECT * FROM login WHERE username = ? AND password = ? ';
    
    const username=req.body.username;
    const password=req.body.password;

    db.query(sql,[username,password],(err,result)=>{
            if(err){
                return res.json({err : err});
            } 
            if(result.length>0){
                return res.json({message :"true"})
            }else{
                return res.json({message :"Incorrect username or password!!!"})
            }
      
        
    });
});

app.get("/api/get", (req,res)=>{
    const sql="SELECT * FROM book";
    db.query(sql,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
});

app.post("/api/savebook", (req,res)=>{
  const sql="INSERT INTO book VALUES (?,?,?,?,?)";

  const bId=req.body.bookId;
  const title=req.body.bookTitle;
  const author=req.body.bookAuthor;
  const language=req.body.bookLanguage;
  const price=req.body.bookPrice;

  db.query(sql,[bId,title,author,language,price],(err,result)=>{
    if(err){
        return res.json({err : err});
    } 

        return res.json({message :"Saved Successfully"})
    
  });
});

app.put('/api/updatebook',(req,res)=>{
    const sql='UPDATE book SET title=? ,author=? ,language=?, price=? WHERE bid=? '

    const title=req.body.bookTitle;
    const author=req.body.bookAuthor;
    const language=req.body.bookLanguage;
    const price=req.body.bookPrice;
    const bId=req.body.bookId;

    db.query(sql,[title,author,language,price,bId],(err,result)=>{
        if(err){
            return res.json({err:err})
        }
        return res.json({message:"Updated Successfully"})
    })

})

app.post('/api/deletebook',(req,res)=>{
    const sql='DELETE FROM book WHERE bId=?';

    const bId=req.body.bookId;

    db.query(sql,[bId],(err,result)=>{
        if(err){
            return res.json({err:err})
        }
        return res.json({message:"Deleted Successfully"})
    })

})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});