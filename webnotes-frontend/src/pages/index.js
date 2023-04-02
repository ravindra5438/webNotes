import React from 'react';
import { useRouter } from 'next/router';
import MyCard from '@/components/MyCard';
import { socket } from '@/socket';

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

    return () => {
      socket.off('data', 'data',(data) => {
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

  // socket.on("note:create", (data) => {
  //   console.log("data from user",data);
  // })

  // socket.on("note:read",(data) => {
  //   console.log("all notes from client side",data)
  // })


  socket.emit('needData')




  
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div style={{display:"grid",placeItems:'center'}}>
      <button onClick={handleLogout}>Logout</button>
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
        {data.map(item => {
          console.log(item);
          return (
          <div key={item._id}  style={{margin:16}}>
            <MyCard title={item.title} description={item.description} users={item.contributors}/>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
