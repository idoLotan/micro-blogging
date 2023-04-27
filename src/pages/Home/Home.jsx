import AddTweet from "../../components/AddTweet";
import Tweets from "../../components/Tweets";

const Home = () => {
  return (
    <div className="home">
      <AddTweet />
      <Tweets></Tweets>
    </div>
  );
};

export default Home;
