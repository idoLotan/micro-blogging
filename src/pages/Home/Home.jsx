import { useEffect, useState, useContext } from "react";
import AddTweet from "../../components/AddTweet";
import Tweets from "../../components/Tweets";
import { UserContext } from "../../Context/userContext";
import useFetch from "../../Hooks/useFetch";

const Home = () => {
  const [isLoaderOn, setIsLoaderOn] = useState(true);
  const { getMoreTweets, getTweets } = useFetch();
  const context = useContext(UserContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getTweets();

    setIsLoaderOn(false);
  }, []);
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY + 5 >= document.body.scrollHeight) {
      getMoreTweets();
    }
  };

  return (
    <div className="home">
      {isLoaderOn ? (
        <div className="loader"></div>
      ) : context.isErorOn ? (
        <div className="display-eror">something went wrong try agian</div>
      ) : (
        <>
          <AddTweet />
          <Tweets setCount={setCount}></Tweets>
        </>
      )}
    </div>
  );
};

export default Home;
