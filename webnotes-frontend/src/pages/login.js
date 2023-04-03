import React from 'react'
import { useRouter } from 'next/router';
import Dropdown from '@/components/DropDown';
import { socket } from '@/socket';
import { Typography } from '@mui/material';

function login() {

    const router = useRouter();

      const handleSelect = (selectedName) => {
        if(selectedName !== "" && selectedName !== null){
        router.push({
            pathname: '/',
            query: {user:selectedName},
        }); 
        socket.connect();
    }
      }

        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];

    
      return (
        <div style={{backgroundImage: `url('https://cdn.pixabay.com/photo/2016/03/27/23/11/post-it-notes-1284667__340.jpg')`, 
        backgroundSize: 'cover',
        }}>
          <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection:'column',
            background:'radial-gradient(circle, rgba(0,0,0,0.567647041726847) 0%, rgba(0,0,0,0.5788515235195641) 17%, rgba(0,0,0,1) 100%)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <h1 style={{color:'greenYellow'}}>Log In</h1>
            <Typography color="rgb(255,255,255)">This is just a prototype so please select a user</Typography>
            <div style={{marginBlock:48}}>
              <Dropdown names={names} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      )
}

export default login