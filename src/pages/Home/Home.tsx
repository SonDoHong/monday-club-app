import './Home.css'
import img from '../../assets/img/image.png'

function Home() {
    return <div className="wrapper_home">
        <img className="home_img" src={img} alt="" />
    </div>;
}

export default Home;
