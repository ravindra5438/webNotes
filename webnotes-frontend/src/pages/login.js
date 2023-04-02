import React from 'react'
import { useRouter } from 'next/router';
import Dropdown from '@/components/DropDown';
import { socket } from '@/socket';

function login() {

    const router = useRouter();

      const handleSelect = (selectedName) => {
        // console.log(`Selected name: ${selectedName}`);
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
        <div>
          <h1>Login</h1>
          <Dropdown names={names} onSelect={handleSelect} />
        </div>
      )
}

export default login