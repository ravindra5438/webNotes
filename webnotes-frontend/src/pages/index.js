import React from 'react';
import { useRouter } from 'next/router';
import MyCard from '@/components/MyCard';
import { socket } from '@/socket';
import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [data,setData] = React.useState([]);
  
  React.useEffect(() => {
    const {user} = router.query;
    if (user) {
      setIsLoggedIn(true);
    } else {
      router.push('/login'); 
    }
  }, []);
  
  React.useEffect(() => {

    socket.on('data',(data) => {
      setData(data);
      console.log("data is set",data);
    })

    socket.on("note:update",(data)=> {
      console.log("updatedUser",data);
    })

    return () => {
      socket.off('data',(data) => {
        setData(data);
        console.log("data is set",data);
      });
    };
  }, []);
  
  
  const handleLogout = () => {
    setIsLoggedIn(false); 
    socket.disconnect();
    router.push('/login'); 
  }

  
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Navbar logOut={handleLogout} user={router.query.user}/>
      <div style={{display:"flex",flexDirection:"row",justifyContent:'center',alignItems:'center',flexWrap:"wrap"}}>
        {data.map(item => {

          return (
          <div key={item._id}  style={{margin:16}}>
            <MyCard id={item._id} thisUser={router.query.user} title={item.title} description={item.description} users={item.contributors}/>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
