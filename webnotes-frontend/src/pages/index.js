import React from 'react';
import { useRouter } from 'next/router';
import MyCard from '@/components/MyCard';
import { socket } from '@/socket';
import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [data, setData] = React.useState([]);
  // const [count, setCount] = React.useState(10);
  let count = 10;

  let countRun;
  React.useEffect(() => {
    const { user } = router.query;
    if (user) {
      setIsLoggedIn(true);
    } else {
      router.push('/login');
    }
  }, []);

  // function increment() {
  //   setCount(count + 10);
  // }

  const handleInfiniteScroll = async () => {

    console.log("Scroll Height" + document.documentElement.scrollHeight);
    console.log("Scroll Top" + document.documentElement.scrollTop);
    console.log("inner Height" + window.innerHeight);

    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 2 >= document.documentElement.scrollHeight
      ) {
        // countRun = count + 10;
        console.log("pahle", count);

        // setCount(countRun);

        console.log(count);
        // console.log(countRun);
        // increment();
        console.log(count);
        count = count + 10;
        socket.emit("scroll", { limit: count });
        console.log("shubhak", count)
        socket.on('scroll', (data) => {
          setData(data);
          console.log("scroll data ", data);
        });
      }

    } catch (error) {
      console.log(error);

    }

  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll)
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  React.useEffect(() => {

    socket.on('data', (data) => {
      setData(data);
      console.log("data is set", data);
    });
    // socket.emit("scroll", { limit: 10 + 10 });
    // socket.on('scroll', (data) => {
    //   setData(data);
    //   console.log("scroll data ", data);
    // });
    socket.on("note:update", (data) => {
      console.log("updatedUser", data);
    })

    return () => {
      socket.off('data', (data) => {
        setData(data);
        console.log("data is set", data);
      });
    };
  }, [count]);


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
      <Navbar logOut={handleLogout} user={router.query.user} />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center', flexWrap: "wrap" }}>
        {data.map(item => {

          return (
            <div key={item._id} style={{ margin: 16 }}>
              <MyCard id={item._id} thisUser={router.query.user} title={item.title} description={item.description} users={item.contributors} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
