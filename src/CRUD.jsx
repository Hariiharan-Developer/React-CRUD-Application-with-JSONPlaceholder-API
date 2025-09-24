import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const CRUD = () => {
    // 1. State:
        // User data state : 
    const [user,setUser] =useState([])

        // state for update & edit user details : 
     const [editId,setEditId] = useState(null)
     const [editEmail,setEditEmail] = useState('')
     const [editWebsite,setEditWebsite] = useState('')

    // 2. Fetch user data :
    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((response)=>setUser(response))
    },[])

    //3. created state value for (Add) user:
    const [addName,setAddName] = useState('')
    const [addEmail,setAddEmail]= useState('')
    const [addWebsite,setAddWebsite] = useState('')

    // 4. addClick function for adding new user :

    const addClick =()=>{

        //Retrive the state elements :

        const name =addName.trim();
        const email = addEmail.trim()
        const website = addWebsite.trim()

        if(name && email && website){

            //API calling:
            fetch('https://jsonplaceholder.typicode.com/users',{
                method:'POST',
                headers:{'Content-Type' :'application/json; charset =UTF-8'},
                body:JSON.stringify({
                    name,
                    email,
                    website
                })
            }).then((res)=>res.json())
            .then((data)=>{
                setUser([...user,data])

                // reset input value : 
                     setAddName("");
                     setAddEmail("");
                     setAddWebsite("");
                toast.success('User Added Successfully',{
                    style:{backgroundColor:'black', color:'white'}
                })
            })
       
            .catch((error)=>{
                console.log(error.message)
                toast.error('User Not Addes Server Error' ,{
                    style:{backgroundColor:'black' , color:'white'}
                })
            })
        }
        else{
            toast.warning('Please fill the user details',{
                style:{backgroundColor:'black', color:'white'}
            })
        }
    }

    // Save Fucntion after edit (or) updated value :
    const saveEdit =(id)=>{
        const updateUserDate =
        {
            ...user.find((u)=>u.id ===id),
            email : editEmail,
            website : editWebsite
        }
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'PUT',
            headers: {'Content-Type': 'application/json ; charset = UTF-8'},
            body:JSON.stringify(updateUserDate)
        }).then((res)=>res.json())
        .then((res)=>{
           setUser(user.map(u=>u.id===id ?res:u))
           setEditId(null);
            toast.success('User Updated Succesfully',{
                style:{backgroundColor:'black',color:'white'}
            })
        }).catch((error)=>{
            console.log(error.message)
            toast.error(error.message,{
                style:{backgroundColor:'black',color:"white"}
            })
        })
    }

    //Delete user details :
    const deletId =(id)=>{
        fetch('https://jsonplaceholder.typicode.com/users/${id}',{
            method:'DELETE'
        })
        .then((res)=>{
            if(res.ok){
                setUser(user.filter((u)=>u.id !==id))
                toast.success('Userd deleted successfully',{
                    style:{backgroundColor:'black',color:'white'}
                })
            }
            else{
                toast.error('Failed to delete user',{
                    style:{backgroundColor:'black',color:'white'}
                })
            }
        })
        .catch((error)=>{
            console.log(error.message)
            toast.error(error.message,{
                style:{backgroundColor:'black',color:'white'}
            })
        })
    }



  return (
    <div className='container'>
      <h3 className='mt-2 text-center'>CRUD operation with JSON placeholder</h3>
      <br/>
      <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Website</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {user.map((users)=>
    <tr key={users.id}>
      <th scope="row">{users.id}</th>
      <td>
       {users.name}
       </td>
      <td>
        {editId===users.id ? 
        (<input onChange={(e)=>setEditEmail(e.target.value)} 
        value={editEmail}
        type='text' />)
        :users.email}
       </td>
      <td>
        {editId===users.id ?
         (<input onChange={(e)=>setEditWebsite(e.target.value)}
         value={editWebsite} 
         type='text' />)
        :users.website}
       </td>
      <td>
        {editId ===users.id ? 
        (<button 
            onClick={()=>saveEdit(users.id)}
            className='btn btn-success btn-sm mx-1 my-1'>save</button>)

        :<button 
            onClick={()=>
                {
                    setEditId(users.id)
                    setEditEmail(users.email)
                    setEditWebsite(users.website)
                }}
            className='btn btn-primary btn-sm mx-1 my-1'>Edit</button>}

            <button 
            onClick={()=>deletId(users.id)}
            className='btn btn-danger btn-sm mx-1 my-1'>Delete</button>
        
      </td>
    </tr>
    )}
    

    <tr>
       
        <th></th>
            <td><input value={addName} onChange={(e)=>setAddName(e.target.value)} type="text" placeholder=' Add Name'/></td>
            <td><input value={addEmail} onChange={(e)=>setAddEmail(e.target.value)} type="text" placeholder=' Add e-mail'/></td>
            <td><input value={addWebsite} onChange={(e)=>setAddWebsite(e.target.value)} type="text" placeholder=' Add website'/></td>
            <td><button onClick={addClick} className='btn btn-success btn-sm mx-1 my-1'>Add User</button></td>
    </tr>
  </tbody>
</table>
<ToastContainer position='top-center' autoClose={3000}/>
    </div>
  )
}

export default CRUD
